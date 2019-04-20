let RoleAttack = cc.Class({
    extends: cc.Component,

    properties: {
        gameCtrl:{
            default:null,
            type:cc.GameCtrl,
        }
    },

    start () {
        this.moveComp = this.node.getComponent(cc.RoleMove);
        this.bulletSpeed = 20;
        this.bulletDis = 240;
    },

    attack () {
        console.log("attack");
        this.moveComp.move('stop');
        let dir = this.moveComp.dir;
        
        this.gamectrl.createBullet(this.bulletSpeed, this.bulletDis, dir, type, x, y);
    },
});

cc.RoleAttack = module.exports = RoleAttack;