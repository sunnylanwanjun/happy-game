cc.Class({
    extends: cc.Component,

    properties: {
        count0:{
            default:null,
            type:cc.Label,
        },
        count1:{
            default:null,
            type:cc.Label,
        },
        count2:{
            default:null,
            type:cc.Label,
        },
        count3:{
            default:null,
            type:cc.Label,
        },
        leftTime:{
            default:null,
            type:cc.Label,
        },
    },

    start () {
        this.leftTimeVal = 60;
        this.labelArr = [this.count0, this.count1, this.count2, this.count3];
        this.count0.string = 0;
        this.count1.string = 0;
        this.count2.string = 0;
        this.count3.string = 0;
        this.hasToResult = false;
    },

    updateScore (type, score) {
        let label = this.labelArr[type];
        if (!label) return;
        label.string = score;
    },

    update (dt) {
        this.leftTimeVal -= dt;
        this.leftTime.string = "Left time : " + Math.floor(this.leftTimeVal) + 's';
        if (!this.hasToResult && this.leftTimeVal <= 0) {
            this.hasToResult = true;
            cc.director.loadScene('result');
        }
    }
});
