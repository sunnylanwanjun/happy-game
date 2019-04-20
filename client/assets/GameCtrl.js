let GameCtrl = cc.Class({
    extends: cc.Component,
    name: 'cc.GameCtrl',

    properties: {
        mainRole:{
            type:cc.Node,
            default:null,
        },
        bullet:{
            type:cc.Node,
            default:null,
        }
    },

    onLoad () {
        // for(let i = 1; i <= 3; i++) {
        //     let aiNode = cc.instantiate(this.mainRole);
        //     let aiMove = aiNode.getComponent(cc.RoleMove);
        //     aiMove.init(i);
        //     aiNode.addComponent(cc.AICtrl);
        //     aiNode.removeComponent(cc.PlayerCtrl);
        // }
        this.mainRole.init(0);
        this.bulletArr = [];
        this.bulletArr.push(bullet);
    },

    createBullet (moveSpeed, dis, dir, type, x, y) {
        let bullet = this.bulletArr.pop();
        if (!bullet) {
            bullet = cc.instantiate(this.bullet);
        }
        bullet.init(moveSpeed, dis, dir, type, x, y);
        bullet.active = true;
    },

    destroyBullet (bullet) {
        bullet.active = false;
        this.bulletArr.push(bullet);
    }
});

cc.GameCtrl = module.exports = GameCtrl;