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
        },
        name0:{
            default: null,
            type: cc.Node,
        },
        name1:{
            default: null,
            type: cc.Node,
        },
        name2:{
            default: null,
            type: cc.Node,
        },
        name3:{
            default: null,
            type: cc.Node,
        },
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
        this.map.arriveGrid(this.curRow, this.curCol, this.type, this);
        this.nameMap = {
            [0]:this.name0,
            [1]:this.name1,
            [2]:this.name2,
            [3]:this.name3
        };

        let skinType = type + 1;
        this.avatar.setSkin('skin_0' + skinType);

        cc.ResultInfo[type].skinType = 'skin_0' + skinType;
        cc.ResultInfo[type].score = 0;

        this.nameNode = this.nameMap[type];
        this.nameNode.active = true;
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
                    this.nameNode.scaleX = -1;
                    this._setAvatar("standby_S");
                break;
                case 'right':
                    this.dir = dir;
                    this.node.scaleX = 1;
                    this.nameNode.scaleX = 1;
                    this._setAvatar("standby_S");
                break;
                case 'down':
                    this.dir = dir;
                    this.node.scaleX = 1;
                    this.nameNode.scaleX = 1;
                    this._setAvatar("standby_F");
                break;
                case 'up':
                    this.dir = dir;
                    this.node.scaleX = 1;
                    this.nameNode.scaleX = 1;
                    this._setAvatar("standby_B");
                break;
            }
        } else if (this.state == "attack") {
            switch (dir) {
                case 'left':
                    this.dir = dir;
                    this.node.scaleX = -1;
                    this.nameNode.scaleX = -1;
                    this._setAvatar("shoot_S");
                break;
                case 'right':
                    this.dir = dir;
                    this.node.scaleX = 1;
                    this.nameNode.scaleX = 1;
                    this._setAvatar("shoot_S");
                break;
                case 'down':
                    this.dir = dir;
                    this.node.scaleX = 1;
                    this.nameNode.scaleX = 1;
                    this._setAvatar("shoot_F");
                break;
                case 'up':
                    this.dir = dir;
                    this.node.scaleX = 1;
                    this.nameNode.scaleX = 1;
                    this._setAvatar("shoot_B");
                break;
            }
        } else {
            switch (dir) {
                case 'left':
                    this.dir = dir;
                    this.node.scaleX = -1;
                    this.nameNode.scaleX = -1;
                    this._setAvatar("move_S");
                break;
                case 'right':
                    this.dir = dir;
                    this.node.scaleX = 1;
                    this.nameNode.scaleX = 1;
                    this._setAvatar("move_S");
                break;
                case 'down':
                    this.dir = dir;
                    this.node.scaleX = 1;
                    this.nameNode.scaleX = 1;
                    this._setAvatar("move_F");
                break;
                case 'up':
                    this.dir = dir;
                    this.node.scaleX = 1;
                    this.nameNode.scaleX = 1;
                    this._setAvatar("move_B");
                break;
            }
        }
    },

    update () {
        if (this.type === undefined) return;
        let x = this.node.x;
        let y = this.node.y;
        let isToEdge = false;
        let rowChange = false;
        let colChange = false;
        switch (this.state) {
            case 'left':
                this.updateAvatar('left');
                isToEdge = this.curCol <= 0;
                x -= this.moveSpeed;
                rowChange = true;
            break;
            case 'right':
                this.updateAvatar('right');
                isToEdge = (this.curCol >= this.map.maxCol - 1);
                x += this.moveSpeed;
                rowChange = true;
            break;
            case 'down':
                isToEdge = (this.curRow <= 0);
                this.updateAvatar('down');
                y -= this.moveSpeed;
                colChange = true;
            break;
            case 'up':
                isToEdge = (this.curRow >= this.map.maxRow - 1);
                this.updateAvatar('up');
                y += this.moveSpeed;
                colChange = true;
            break;
            case 'stop':
                this.updateAvatar(this.dir);
            break;
            case 'attack':
                this.updateAvatar(this.dir);
            break;
        }

        let tempRowCol = this.map.getGridByPos(x, y);
        if (!tempRowCol || isToEdge) {
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
        this.map.arriveGrid(this.curRow, this.curCol, this.type, this);
        if (rowChange) {
            this.map.arriveGrid(this.curRow + tempRowCol.rowOffset, this.curCol, this.type, this);
        }
        if (colChange) {
            this.map.arriveGrid(this.curRow, this.curCol + tempRowCol.colOffset, this.type, this);
        }
    },


});