let _dirArr = ['left', 'right', 'down', 'up'];

let RoleMove = cc.Class({
    extends: cc.Component,

    properties: {
        map:{
            default: 0,
            type: cc.GameMap,
        }
    },

    start () {
        this.moveSpeed = 10;
        this.state = 'stop';
        this.dir = Math.floor(_dirArr[Math.random() * (_dirArr.length - 1)]);
        this.type = -1;
    },

    init (type) {
        this.type = type;
        let tempRowCol = this.map.getRandomRowCol();
        this.curRow = tempRowCol.row;
        this.curCol = tempRowCol.col;
        let tempPos = this.map.getGridPos();
        this.node.x = tempPos.x;
        this.node.y = tempPos.y;
        this.map.arriveGrid(this.curRow, this.curCol, this.type);
    },

    move (state) {
        this.state = state;
    },

    update () {
        if (this.type == -1) return;
        let x = this.node.x;
        let y = this.node.y;
        switch (this.state) {
            case 'left':
                x -= this.moveSpeed;
                this.dir = 'left';
            break;
            case 'right':
                x += this.moveSpeed;
                this.dir = 'right';
            break;
            case 'down':
                y -= this.moveSpeed;
                this.dir = 'down';
            break;
            case 'up':
                y += this.moveSpeed;
                this.dir = 'up';
            break;
        }
        let tempRowCol = this.map.getGridByPos(x, y);
        if (!tempRowCol) return;
        this.node.x = x;
        this.node.y = y;

        if (tempRowCol.row == this.curRow && tempRowCol.col == this.curCol) {
            return;
        }
        this.curRow = tempRowCol.row;
        this.curCol = tempRowCol.col;
        this.map.arriveGrid(this.curRow, this.curCol, this.type);
    }
});

cc.RoleMove = module.exports = RoleMove;