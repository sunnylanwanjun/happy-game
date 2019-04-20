let AICtrl = cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    start () {
        this.moveComp = this.node.getComponent(cc.RoleMove);
        this.attackComp = this.node.getComponent(cc.RoleAttack);
    },

    
});

cc.AICtrl = module.exports = AICtrl;