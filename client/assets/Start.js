cc.Class({
    extends: cc.Component,

    properties: {
        loading:{
            default:null,
            type:cc.Node,
        }
    },

    start () {
        cc.ResultInfo = [
            {skinType:0,score:0},
            {skinType:0,score:0},
            {skinType:0,score:0},
            {skinType:0,score:0}
        ]
        this.hasToMain = false;
        this.loading.active = false;
    },

    toGame () {
        if (!this.hasToMain) {
            this.hasToMain = true;
            this.loading.active = true;
            this.loading.runAction(
                cc.repeatForever(
                    cc.sequence(
                        cc.fadeOut(0.5),
                        cc.fadeIn(0.5),
                    )
                )
            );
            cc.director.loadScene('main');
        }
    }
});
