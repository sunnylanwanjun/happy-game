let _tempRowCol = {row:0, col:0, rowOffset:0, colOffset:0};
let _tempPos = cc.v2(0, 0);

let GameMap = cc.Class({
    extends: cc.Component,
    name : 'cc.GameMap',

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
        }
    },

    start () {
        this.map = {};
        this.checkInterval = 3;
        this.curTime = 0;

        this.commonGoodsType = 5;
        this.maxWidth = 1920;
        this.maxHeight = 1080;
        this.gridWidth = 80;
        this.gridHeight = 80;
        this.maxRow = this.maxWidth / this.gridWidth;
        this.maxCol = this.maxHeight / this.gridHeight;
        this.node.anchorX = 0;
        this.node.anchorY = 0;

        this.initGrid();

        this.maxGoodsNum = 50;
        this.totalGoodsNumMap = [];
        for (let i = 0; i < this.goodsArr.length; i++) {
            this.totalGoodsNumMap[i] = 0;
            for (let j = 0; j < this.maxGoodsNum; j++) {
                this.randomGrid(i);
            }
        }
    },

    initGrid () {
        let x = 0, y = 0;

        for (let r = 0; r < this.maxRow; r++) {
            y += this.gridHeight;
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
                let bgSp = bg.addComponent(cc.Sprite);
                bgSp.spriteFrame = new cc.SpriteFrame();

                let line = new cc.Node();
                grid.addChild(line);
                let lineSp = line.addComponent(cc.Sprite);
                lineSp.spriteFrame = new cc.SpriteFrame();

                let good = new cc.Node();
                grid.addChild(good);
                let goodSp = good.addComponent(cc.Sprite);
                goodSp.spriteFrame = new cc.SpriteFrame();

                colData.grid = grid;
                colData.bgSp = bgSp;
                colData.lineSp = lineSp;
                colData.goodSp = goodSp;

                this.setGrid(row, col, 0);
            }
        }
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
            console.log("getGrid rowData is empty, row is",row);
            return;
        }
        let colData = rowData[col];
        if (!colData) {
            console.log("getGrid colData is empty, col is",col);
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
        let bgSp = colData.bgSp;
        let lineSp = colData.lineSp;
        bgSp.spriteFrame.setTexture(this.bgArr[type], cc.rect(x, y, this.gridWidth, this.gridHeight));
        lineSp.spriteFrame.setTexture(this.lineArr[type]);
        colData.type = type;
        colData.goodsNumMap = colData.goodsNumMap || {};
        this.updateGrid(row, col);
    },

    getRandomRowCol () {
        _tempRowCol.row = Math.floor(Math.random() * (this.maxRow - 1));
        _tempRowCol.col = Math.floor(Math.random() * (this.maxCol - 1));
        return _tempRowCol;
    },

    randomGrid (type) {
        let tempRowCol = this.getRandom();
        let colData = this.getGrid(tempRowCol.row, tempRowCol.col);
        if (!colData) return;

        colData.goodsNumMap[type] = colData.goodsNumMap[type] || 0;
        colData.goodsNumMap[type]++;
        this.totalGoodsNumMap[type]++;
        this.updateGrid(row, col);
    },

    arriveGrid (row, col, type) {
        let colData = this.getGrid(row, col);
        if (!colData) return;
        if (colData.type === this.commonGoodsType) {
            type = this.commonGoodsType;
        }
        if (colData.goodsNumMap[type] > 0) {
            colData.goodsNumMap[type]--;
            this.totalGoodsNumMap[type]--;
            this.updateGrid(row, col);
        }
    },

    updateGrid (row, col) {
        let colData = this.getGrid(row, col);
        if (!colData) return;

        let curType = colData.type;
        let curTypeNum = colData.goodsNumMap[curType];
        if (curTypeNum == 0) {
            colData.showType = null;
            colData.goodSp.setVisible(false);
            return;
        }

        let showType = colData.showType;
        if (showType == curType) {
            return;
        }

        colData.showType = curType;
        colData.goodSp.setTexture(this.goodsArr[curType]);
        colData.goodSp.setVisible(true);
    },

    udpate (dt) {
        this.curTime += dt;
        if (this.curTime < this.checkInterval) return;
        this.curTime = 0;
        for (let i = 0; i < this.totalGoodsNumMap.length; i++) {
            let randomNum = this.maxGoodsNum - this.totalGoodsNumMap[i];
            if (randomNum <= 0) continue;
            for (let j = 0; j < randomNum; j++) {
                this.randomGrid(i);
            }
        }
    }
});

cc.GameMap = module.exports = GameMap;