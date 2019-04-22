cc.Class({
    extends: cc.Component,

    properties: {
        bgm:{
            type: cc.AudioClip,
            default: null
        },
        attack:{
            type: cc.AudioClip,
            default: null
        },
        eat:{
            type: cc.AudioClip,
            default: null
        },
        bgmVolumn:0.5,
        effVolumn:1,
    },

    onLoad () {
        this.playBGM();
        this.bgmID = null;
    },

    onDestroy () {
        if (this.bgmID) {
            cc.audioEngine.stop(this.bgmID);
            this.bgmID = null;
        }
    },

    playBGM () {
        this.bgmID = cc.audioEngine.play(this.bgm, true, this.bgmVolumn);
    },

    playAttack () {
        cc.audioEngine.play(this.attack, false, this.effVolumn);
    },

    playEat () {
        cc.audioEngine.play(this.eat, false, this.effVolumn);
    }
});