let RoleMove = require('RoleMove');
let RoleAttack = require('RoleAttack');
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    start () {
        this.moveComp = this.node.getComponent(RoleMove);
        this.attackComp = this.node.getComponent(RoleAttack);

        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown.bind(this));
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp.bind(this));

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown.bind(this));
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp.bind(this));
    },

    onKeyDown (event) {
        if (!this.node) return;
        if (!this.moveComp) this.moveComp = this.node.getComponent(RoleMove);
        if (!this.attackComp)  this.moveComp = this.node.getComponent(RoleAttack);

        if (!this.moveComp) return;
        if (!this.attackComp) return;

        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.moveComp.move('left');
                break;
            case cc.macro.KEY.d:
                this.moveComp.move('right');
                break;
            case cc.macro.KEY.w:
                this.moveComp.move('up');
                break;
            case cc.macro.KEY.s:
                this.moveComp.move('down');
                break;
            case cc.macro.KEY.j:
                this.attackComp.attack();
                break;
        }
    },

    onKeyUp (event) {
        if (!this.node) return;
        if (!this.moveComp) this.moveComp = this.node.getComponent(RoleMove);
        if (!this.attackComp)  this.moveComp = this.node.getComponent(RoleAttack);

        if (!this.moveComp) return;
        if (!this.attackComp) return;

        switch (event.keyCode) {
            case cc.macro.KEY.a:
                if (this.moveComp.state == 'left') this.moveComp.move('stop');
            break;
            case cc.macro.KEY.d:
                if (this.moveComp.state == 'right') this.moveComp.move('stop');
            break;
            case cc.macro.KEY.w:
            if (this.moveComp.state == 'up') this.moveComp.move('stop');
            break;
            case cc.macro.KEY.s:
            if (this.moveComp.state == 'down') this.moveComp.move('stop');
            break;
        }
    }
});