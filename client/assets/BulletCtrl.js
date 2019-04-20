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

    init (moveSpeed, dis, dir, type, x, y, roleAttack) {
        this.moveSpeed = moveSpeed;
        this.moveDis = 0;
        this.dis = dis;
        this.dir = dir;
        this.type = type;
        this.node.x = x;
        this.node.y = y;        
        this.roleAttack = roleAttack;
        this.preRow = -1;
        this.preCol = -1;
        this.preRowChangeRow = -1;
        this.preRowChangeCol = -1;
        this.preColChangeRow = -1;
        this.preColChangeCol = -1;
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
            this.preRow = -1;
            this.preCol = -1;
            this.preRowChangeRow = -1;
            this.preRowChangeCol = -1;
            this.preColChangeRow = -1;
            this.preColChangeCol = -1;
            this.gameCtrl.destroyBullet(this.node, this.type);
            return;
        }
        let colData = this.gameMap.getGrid(tempRowCol.row, tempRowCol.col);
        if (colData && (this.preRow !== tempRowCol.row || this.preCol != tempRowCol.col) && (colData.type !== this.type)) {
            this.preRow = tempRowCol.row;
            this.preCol = tempRowCol.col;
            this.gameMap.setGrid(tempRowCol.row, tempRowCol.col, this.type);
        }
        if (rowChange) {
            let tempRow = tempRowCol.row + tempRowCol.rowOffset;
            colData = this.gameMap.getGrid(tempRow, tempRowCol.col);
            if (colData && (this.preRowChangeRow !== tempRow || this.preRowChangeCol != tempRowCol.col) && colData.type !== this.type) {
                this.preRowChangeRow = tempRow;
                this.preRowChangeCol = tempRowCol.col;
                this.gameMap.setGrid(tempRow, tempRowCol.col, this.type);
            }
        }
        if (colChange) {
            let tempCol = tempRowCol.col + tempRowCol.colOffset;
            colData = this.gameMap.getGrid(tempRowCol.row, tempCol);
            if (colData && (this.preColChangeRow !== tempRowCol.row || this.preColChangeCol != tempCol) && colData.type !== this.type) {
                this.preColChangeRow = tempRowCol.row;
                this.preColChangeCol = tempCol;
                this.gameMap.setGrid(tempRowCol.row, tempCol, this.type);
            }
        }
    }
});