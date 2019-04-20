let BulletCtrl = cc.Class({
    extends: cc.Component,

    properties: {
        gameMap: {
            default:null,
            type:cc.GameMap,
        },
        gameCtrl:{
            default:null,
            type:cc.GameCtrl,
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
        switch (this.dir) {
            case 'left':
                this.node.x -= this.moveSpeed;
            break;
            case 'right':
                this.node.x += this.moveSpeed;
            break;
            case 'down':
                this.node.y -= this.moveSpeed;
            break;
            case 'up':
                this.node.y += this.moveSpeed;
            break;
        }
        this.moveDis += this.moveSpeed;
        let tempRowCol = this.getGridByPos(this.node.x, this.node.y);
        if (this.moveDis >= this.dis || !tempRowCol) {
            this.gameCtrl.destroyBullet(this.node);
            return;
        }
        this.gameMap.setGrid(tempRowCol.row, tempRowCol.col, this.type);
    }
});

cc.BulletCtrl = module.exports = BulletCtrl;