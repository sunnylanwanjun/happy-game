let RoleMove = require('RoleMove');
let RoleAttack = require('RoleAttack');
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    start () {
        if (!this.node) return;
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
            case cc.macro.KEY.left:
                this.moveComp.move('left');
                break;
            case cc.macro.KEY.right:
                this.moveComp.move('right');
                break;
            case cc.macro.KEY.up:
                this.moveComp.move('up');
                break;
            case cc.macro.KEY.down:
                this.moveComp.move('down');
                break;
            case 48:
            case cc.macro.KEY.num0:
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
            case cc.macro.KEY.left:
                if (this.moveComp.state == 'left') this.moveComp.move('stop');
            break;
            case cc.macro.KEY.right:
                if (this.moveComp.state == 'right') this.moveComp.move('stop');
            break;
            case cc.macro.KEY.up:
            if (this.moveComp.state == 'up') this.moveComp.move('stop');
            break;
            case cc.macro.KEY.down:
            if (this.moveComp.state == 'down') this.moveComp.move('stop');
            break;
        }
    }
});