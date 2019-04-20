let RoleMove = require('RoleMove');
let RoleAttack = require('RoleAttack');
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    start () {
        this.state = '';
        this.moveComp = this.node.getComponent(RoleMove);
        this.attackComp = this.node.getComponent(RoleAttack);
    },

    update () {

    },
});