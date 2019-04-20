let GameMap = require('GameMap');
let _dirArr = ['left', 'right', 'down', 'up'];

cc.Class({
    extends: cc.Component,

    properties: {
        map:{
            default: null,
            type: GameMap,
        },
        avatar:{
            default: null,
            type: sp.Skeleton,
        }
    },

    init (type) {
        this.moveSpeed = 10;
        this.state = 'stop';
        this.dir = _dirArr[Math.floor(Math.random() * (_dirArr.length - 1))];

        this.type = type;
        let tempRowCol = this.map.getRandomRowCol();
        this.curRow = tempRowCol.row;
        this.curCol = tempRowCol.col;
        let tempPos = this.map.getGridPos(this.curRow, this.curCol);
        this.node.x = tempPos.x;
        this.node.y = tempPos.y;
        this.map.arriveGrid(this.curRow, this.curCol, this.type);

        let skinType = type + 1;
        this.avatar.setSkin('skin_0' + skinType);
        this.avatar.setCompleteListener(function () {
            if (this.state == 'attack') {
                this.move('stop');
            }
        }.bind(this));
    },

    move (state) {
        this.state = state;
    },

    _setAvatar (animationName) {
        if (this.avatar.animation != animationName) {
            this.avatar.animation = animationName;
        }
    },

    updateAvatar (dir) {
        if (this.state == 'stop') {
            switch (dir) {
                case 'left':
                    this.dir = dir;
                    this.node.scaleX = -1;
                    this._setAvatar("standby_S");
                break;
                case 'right':
                    this.dir = dir;
                    this.node.scaleX = 1;
                    this._setAvatar("standby_S");
                break;
                case 'down':
                    this.dir = dir;
                    this.node.scaleX = 1;
                    this._setAvatar("standby_F");
                break;
                case 'up':
                    this.dir = dir;
                    this.node.scaleX = 1;
                    this._setAvatar("standby_B");
                break;
            }
        } else if (this.state == "attack") {
            switch (dir) {
                case 'left':
                    this.dir = dir;
                    this.node.scaleX = -1;
                    this._setAvatar("shoot_S");
                break;
                case 'right':
                    this.dir = dir;
                    this.node.scaleX = 1;
                    this._setAvatar("shoot_S");
                break;
                case 'down':
                    this.dir = dir;
                    this.node.scaleX = 1;
                    this._setAvatar("shoot_F");
                break;
                case 'up':
                    this.dir = dir;
                    this.node.scaleX = 1;
                    this._setAvatar("shoot_B");
                break;
            }
        } else {
            switch (dir) {
                case 'left':
                    this.dir = dir;
                    this.node.scaleX = -1;
                    this._setAvatar("move_S");
                break;
                case 'right':
                    this.dir = dir;
                    this.node.scaleX = 1;
                    this._setAvatar("move_S");
                break;
                case 'down':
                    this.dir = dir;
                    this.node.scaleX = 1;
                    this._setAvatar("move_F");
                break;
                case 'up':
                    this.dir = dir;
                    this.node.scaleX = 1;
                    this._setAvatar("move_B");
                break;
            }
        }
    },

    update () {
        if (this.type === undefined) return;
        let x = this.node.x;
        let y = this.node.y;
        switch (this.state) {
            case 'left':
                this.updateAvatar('left');
                x -= this.moveSpeed;
            break;
            case 'right':
                this.updateAvatar('right');
                x += this.moveSpeed;
            break;
            case 'down':
                this.updateAvatar('down');
                y -= this.moveSpeed;
            break;
            case 'up':
                this.updateAvatar('up');
                y += this.moveSpeed;
            break;
            case 'stop':
                this.updateAvatar(this.dir);
            break;
            case 'attack':
                this.updateAvatar(this.dir);
            break;
        }
        let tempRowCol = this.map.getGridByPos(x, y);
        if (!tempRowCol) {
            this.state = 'stop';
            this.updateAvatar(this.dir);
            return;
        }

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