let RoleMove = require('RoleMove');
let RoleAttack = require('RoleAttack');
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        this.moveComp = this.node.getComponent(RoleMove);
        this.attackComp = this.node.getComponent(RoleAttack);
    },

    start () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown.bind(this));
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp.bind(this));

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown.bind(this));
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp.bind(this));
    },

    onKeyDown (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.moveComp.move('left');
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.moveComp.move('right');
                break;
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
                this.moveComp.move('up');
                break;
            case cc.macro.KEY.s:
            case cc.macro.KEY.down:
                this.moveComp.move('down');
                break;
            case cc.macro.KEY.j:
                this.attackComp.attack();
                break;
        }
    },

    onKeyUp (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                if (this.moveComp.state == 'left') this.moveComp.move('stop');
            break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                if (this.moveComp.state == 'right') this.moveComp.move('stop');
            break;
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
            if (this.moveComp.state == 'up') this.moveComp.move('stop');
            break;
            case cc.macro.KEY.s:
            case cc.macro.KEY.down:
            if (this.moveComp.state == 'down') this.moveComp.move('stop');
            break;
        }
    }
});