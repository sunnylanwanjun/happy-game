cc.Class({
    extends: cc.Component,

    properties: {
        avatar0:{
            default:null,
            type:sp.Skeleton,
        },
        avatar1:{
            default:null,
            type:sp.Skeleton,
        },
        avatar2:{
            default:null,
            type:sp.Skeleton,
        },
        avatar3:{
            default:null,
            type:sp.Skeleton,
        },
        score0:{
            default:null,
            type:cc.Label,
        },
        score1:{
            default:null,
            type:cc.Label,
        },
        score2:{
            default:null,
            type:cc.Label,
        },
        score3:{
            default:null,
            type:cc.Label,
        },
    },

    start () {

        cc.ResultInfo.sort(function (a, b) {
            if (a.score > b.score) {
                return -1;
            } else if (a.score < b.score) {
                return 1;
            } else {
                return 0;
            }
        });

        for (let i = 0; i < cc.ResultInfo.length; i++) {
            let info = cc.ResultInfo[i];
            this['avatar' + i].setSkin(info.skinType);
            this['score' + i].string = info.score;
        }
    },

    toGame () {
        cc.director.loadScene('start');
    }
});
