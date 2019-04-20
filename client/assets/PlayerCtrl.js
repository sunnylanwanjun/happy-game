let PlayerCtrl = cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        this.moveComp = this.node.getComponent(cc.RoleMove);
        this.attackComp = this.node.getComponent(cc.RoleAttack);
    },

    start () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown.bind(this));
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp.bind(this));

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown.bind(this));
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp.bind(this));
    },

    onKeyDown () {
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

    onKeyUp () {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
            case cc.macro.KEY.s:
            case cc.macro.KEY.down:
                this.moveComp.move('stop');
                break;
        }
    }
});

cc.PlayerCtrl = module.exports = PlayerCtrl;