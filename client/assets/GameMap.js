let AudioCtrl = require('AudioCtrl');
let _tempRowCol = {row:0, col:0, rowOffset:0, colOffset:0};
let _tempPos = cc.v2(0, 0);

let GameMap = cc.Class({
    extends: cc.Component,

    properties: {
        bgArr:{
            type: [cc.Texture2D],
            default: [],
        },
        lineArr:{
            type:[cc.Texture2D],
            default:[],
        },
        goodsArr:{
            type:[cc.Texture2D],
            default:[],
        },
        uiPanel:{
            type:require('uiPanel'),
            default:null,
        },
        audioCtrl:{
            default: null,
            type: AudioCtrl,
        }
    },

    onLoad () {
        this.map = {};
        this.checkInterval = 0.3;
        this.curTime = 0;

        this.addScore = 5;
        this.commonGoodsType = 4;
        this.maxWidth = 1920;
        this.maxHeight = 1080;
        this.gridWidth = 80;
        this.gridHeight = 80;
        this.maxRow = Math.floor(this.maxHeight / this.gridHeight);
        this.maxCol = Math.floor(this.maxWidth / this.gridWidth);

        this.initGrid();

        this.maxGoodsNumMap = {[0]:30, [1]:30, [2]:30, [3]:30, [4]:5};
        this.scoreMap = {[0]:0, [1]:0, [2]:0, [3]:0};
        this.totalGoodsNumMap = [];
        for (let i = 0; i < this.goodsArr.length; i++) {
            this.totalGoodsNumMap[i] = 0;
            for (let j = 0; j < this.maxGoodsNumMap[i]; j++) {
                this.randomGrid(i);
            }
        }
    },

    initGrid () {
        let x = 0, y = 0;

        for (let r = 0; r < this.maxRow; r++) {
            x = 0;
            let rowData = this.map[r] = this.map[r] || {};
            for (let c = 0; c < this.maxCol; c++) {
                let colData = rowData[c] = rowData[c] || {};
                let grid = new cc.Node();
                grid.parent = this.node;
                grid.x = x + this.gridWidth * 0.5;
                grid.y = y + this.gridHeight * 0.5;
                x += this.gridWidth;

                let bg = new cc.Node();
                grid.addChild(bg);

                let line = new cc.Node();
                grid.addChild(line);

                let good = new cc.Node();
                grid.addChild(good);

                colData.grid = grid;
                colData.bg = bg;
                colData.line = line;
                colData.good = good;

                this.setGrid(r, c, this.commonGoodsType);
            }
            y += this.gridHeight;
        }
    },

    _setSpriteFrame (node, texture, rect, srcBlendMode, dstBlendMode) {
        let sp = node.getComponent(cc.Sprite);
        if (sp) sp.destroy();
        sp = node.addComponent(cc.Sprite);
        if (srcBlendMode) {
            sp.srcBlendFactor = srcBlendMode;
        }
        if (dstBlendMode) {
            sp.dstBlendFactor = dstBlendMode;
        }
        sp.spriteFrame = new cc.SpriteFrame();
        sp.spriteFrame.setTexture(texture, rect);
    },

    getGridByPos (x, y) {
        let col0 = x / this.gridWidth;
        let row0 = y / this.gridHeight;

        let col = Math.floor(col0);
        let row = Math.floor(row0);

        if (col >= this.maxCol) return null;
        if (row >= this.maxRow) return null;

        _tempRowCol.rowOffset = 0;
        _tempRowCol.colOffset = 0;

        if (row0 - row > 0.5) {
            _tempRowCol.rowOffset = 1;
        } else {
            _tempRowCol.rowOffset = -1;
        }

        if (col0 - col > 0.5) {
            _tempRowCol.colOffset = 1;
        } else {
            _tempRowCol.colOffset = -1;
        }

        _tempRowCol.row = row;
        _tempRowCol.col = col;
        return _tempRowCol;
    },

    getGridPos (row, col) {
        let grid = this.getGrid(row, col);
        if (!grid) return null;
        _tempPos.x = grid.grid.x;
        _tempPos.y = grid.grid.y;
        return _tempPos;
    },

    getGrid (row, col) {
        let rowData = this.map[row];
        if (!rowData) {
            //console.log("getGrid rowData is empty, row is",row);
            return;
        }
        let colData = rowData[col];
        if (!colData) {
            //console.log("getGrid colData is empty, col is",col);
            return;
        }
        return colData;
    },

    setGrid (row, col, type) {
        let colData = this.getGrid(row, col);
        if (!colData) return;
        if (colData.type != this.commonGoodsType) {
            type = this.commonGoodsType;
        }
        let x = col * this.gridWidth;
        let y = row * this.gridHeight;
        let bg = colData.bg;
        let line = colData.line;

        this._setSpriteFrame(bg, this.bgArr[type], cc.rect(x, y, this.gridWidth, this.gridHeight));
        this._setSpriteFrame(line, this.lineArr[type]);

        colData.goodsNumMap = colData.goodsNumMap || {};
        colData.type = type;
        this.updateGrid(row, col);
    },

    getRandomRowCol () {
        _tempRowCol.row = Math.floor(Math.random() * (this.maxRow - 1));
        _tempRowCol.col = Math.floor(Math.random() * (this.maxCol - 1));
        return _tempRowCol;
    },

    randomGrid (type) {
        let tempRowCol = this.getRandomRowCol();
        let colData = this.getGrid(tempRowCol.row, tempRowCol.col);
        if (!colData) return;
        if (this.totalGoodsNumMap[type] >= this.maxGoodsNumMap[type]) return;

        colData.goodsNumMap[type] = colData.goodsNumMap[type] || 0;
        colData.goodsNumMap[type]++;
        this.totalGoodsNumMap[type]++;
        this.updateGrid(tempRowCol.row, tempRowCol.col);
    },

    arriveGrid (row, col, type, roleMove) {
        let colData = this.getGrid(row, col);
        if (!colData) return;
        if (colData.type === this.commonGoodsType) {
            type = this.commonGoodsType;
        }
        if (colData.goodsNumMap[type] > 0) {
            if (this.scoreMap[type] != undefined) {
                this.scoreMap[type] += this.addScore;
                this.uiPanel.updateScore(type, this.scoreMap[type]);
                cc.ResultInfo[type].skinType = 'skin_0' + (type + 1);
                cc.ResultInfo[type].score = this.scoreMap[type];
            } else {
                roleMove.moveSpeed = 20;
            }
            colData.goodsNumMap[type]--;
            this.totalGoodsNumMap[type]--;
            this.updateGrid(row, col);
            this.audioCtrl.playEat();
        }
    },

    updateGrid (row, col) {
        let colData = this.getGrid(row, col);
        if (!colData) return;

        let curType = colData.type;
        let curTypeNum = colData.goodsNumMap[curType];
        if (!curTypeNum) {
            colData.showType = null;
            let sp = colData.good.getComponent(cc.Sprite);
            if (sp) sp.destroy();
            return;
        }

        let showType = colData.showType;
        if (showType == curType) {
            return;
        }

        if (curType >= this.goodsArr.length) {
            return;
        } 

        colData.showType = curType;
        this._setSpriteFrame(colData.good, this.goodsArr[curType], undefined, undefined, cc.macro.BlendFactor.ONE);
    },

    update (dt) {
        this.curTime += dt;
        if (this.curTime < this.checkInterval) return;
        this.curTime = 0;
        for (let i = 0; i < this.totalGoodsNumMap.length; i++) {
            let randomNum = this.maxGoodsNumMap[i] - this.totalGoodsNumMap[i];
            if (randomNum <= 0) continue;
            for (let j = 0; j < randomNum; j++) {
                this.randomGrid(i);
            }
        }
    }
});