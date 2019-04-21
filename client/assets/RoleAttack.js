let RoleMove = require('RoleMove');
let GameCtrl = require('GameCtrl');
let AudioCtrl = require('AudioCtrl');
cc.Class({
    extends: cc.Component,

    properties: {
        gameCtrl:{
            default:null,
            type:GameCtrl,
        },
        audioCtrl:{
            default:null,
            type:AudioCtrl,
        }
    },

    start () {
        this.moveComp = this.node.getComponent(RoleMove);
        this.bulletSpeed = 20;
        this.bulletDis = 12 * 80;
    },

    attack () {
        if (this.moveComp) {
            this.audioCtrl.playAttack();
            this.moveComp.move('attack');
            let dir = this.moveComp.dir;
            let type = this.moveComp.type;
            this.gameCtrl.createBullet(this.bulletSpeed, this.bulletDis, dir, type, this.node.x, this.node.y);
        }
    },
});