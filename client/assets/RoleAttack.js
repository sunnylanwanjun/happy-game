let RoleAttack = cc.Class({
    extends: cc.Component,
    name: 'cc.RoleAttack',

    properties: {
        gameCtrl:{
            default:null,
            type:cc.GameCtrl,
        }
    },

    start () {
        this.moveComp = this.node.getComponent(cc.RoleMove);
        this.bulletSpeed = 20;
        this.bulletDis = 12 * 80;
    },

    attack () {
        this.moveComp.move('stop');
        let dir = this.moveComp.dir;
        let type = this.moveComp.type;
        this.gamectrl.createBullet(this.bulletSpeed, this.bulletDis, dir, type, this.node.x, this.node.y);
    },
});

cc.RoleAttack = module.exports = RoleAttack;