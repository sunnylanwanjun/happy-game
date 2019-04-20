let AICtrl = cc.Class({
    extends: cc.Component,
    name : 'cc.AICtrl',
    
    properties: {
        
    },

    start () {
        this.state = ''
        this.moveComp = this.node.getComponent(cc.RoleMove);
        this.attackComp = this.node.getComponent(cc.RoleAttack);
    },

    update () {

    },
});

cc.AICtrl = module.exports = AICtrl;