cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    start () {
        cc.ResultInfo = [
            {skinType:0,score:0},
            {skinType:0,score:0},
            {skinType:0,score:0},
            {skinType:0,score:0}
        ]
    },

    toGame () {
        cc.director.loadScene('main');
    }
});
