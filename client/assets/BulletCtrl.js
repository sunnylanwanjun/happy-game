let GameMap = require('GameMap');
let GameCtrl = require('GameCtrl');
cc.Class({
    extends: cc.Component,

    properties: {
        gameMap: {
            default:null,
            type:GameMap,
        },
        gameCtrl:{
            default:null,
            type:GameCtrl,
        }
    },

    init (moveSpeed, dis, dir, type, x, y) {
        this.moveSpeed = moveSpeed;
        this.moveDis = 0;
        this.dis = dis;
        this.dir = dir;
        this.type = type;
        this.node.x = x;
        this.node.y = y;        
    },

    update () {
        if (!this.dir) return;
        let rowChange = false;
        let colChange = false;
        switch (this.dir) {
            case 'left':
                this.node.x -= this.moveSpeed;
                this.node.scaleX = -1;
                this.node.rotation = 0;
                rowChange = true;
            break;
            case 'right':
                this.node.x += this.moveSpeed;
                this.node.scaleX = 1;
                this.node.rotation = 0;
                rowChange = true;
            break;
            case 'down':
                this.node.y -= this.moveSpeed;
                this.node.scaleX = 1;
                this.node.rotation = 90;
                colChange = true;
            break;
            case 'up':
                this.node.y += this.moveSpeed;
                this.node.scaleX = 1;
                this.node.rotation = -90;
                colChange = true;
            break;
        }
        this.moveDis += this.moveSpeed;
        let tempRowCol = this.gameMap.getGridByPos(this.node.x, this.node.y);
        if (this.moveDis >= this.dis || !tempRowCol) {
            this.gameCtrl.destroyBullet(this.node, this.type);
            return;
        }
        let colData = this.gameMap.getGrid(tempRowCol.row, tempRowCol.col);
        if (colData && colData.type !== this.type) {
            this.gameMap.setGrid(tempRowCol.row, tempRowCol.col, this.type);
        }
        if (rowChange) {
            let tempRow = tempRowCol.row + tempRowCol.rowOffset;
            colData = this.gameMap.getGrid(tempRow, tempRowCol.col);
            if (colData && colData.type !== this.type) {
                this.gameMap.setGrid(tempRow, tempRowCol.col, this.type);
            }
        }
        if (colChange) {
            let tempCol = tempRowCol.col + tempRowCol.colOffset;
            colData = this.gameMap.getGrid(tempRowCol.row, tempCol);
            if (colData && colData.type !== this.type) {
                this.gameMap.setGrid(tempRowCol.row, tempCol, this.type);
            }
        }
    }
});