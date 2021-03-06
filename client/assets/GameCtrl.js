cc.Class({
    extends: cc.Component,

    properties: {
        mainRole:{
            type:cc.Node,
            default:null,
        },
        bullet01:{
            type:cc.Node,
            default:null,
        },
        bullet02:{
            type:cc.Node,
            default:null,
        },
        bullet03:{
            type:cc.Node,
            default:null,
        },
        bullet04:{
            type:cc.Node,
            default:null,
        }
    },

    start () {
        let AICtrl = require('AICtrl');
        let PlayerCtrl = require('PlayerCtrl');
        let RoleMove = require('RoleMove');
        let PlayerCtrl2 = require('PlayerCtrl2');

        for(let i = 2; i <= 3; i++) {
            let aiNode = cc.instantiate(this.mainRole);
            aiNode.parent = this.mainRole.parent;
            let aiMove = aiNode.getComponent(RoleMove);
            aiMove.init(i);
            aiNode.addComponent(AICtrl);
            aiNode.removeComponent(PlayerCtrl);
        }
        
        let mainRole2 = cc.instantiate(this.mainRole);
        mainRole2.parent = this.mainRole.parent;
        let mainRole2Move = mainRole2.getComponent(RoleMove);
        mainRole2Move.init(1);
        mainRole2.addComponent(PlayerCtrl2);
        mainRole2.removeComponent(PlayerCtrl);

        this.mainRole.getComponent(RoleMove).init(0);

        this.bulletArr01 = [];
        this.bulletArr01.push(this.bullet01);
        this.bulletArr02 = [];
        this.bulletArr02.push(this.bullet02);
        this.bulletArr03 = [];
        this.bulletArr03.push(this.bullet03);
        this.bulletArr04 = [];
        this.bulletArr04.push(this.bullet04);
        this.bulletPool = {
            0:this.bulletArr01,
            1:this.bulletArr02,
            2:this.bulletArr03,
            3:this.bulletArr04,
        };
        this.bulletTpl = {
            0:this.bullet01,
            1:this.bullet02,
            2:this.bullet03,
            3:this.bullet04,
        };
    },

    createBullet (moveSpeed, dis, dir, type, x, y) {
        let bulletArr = this.bulletPool[type];
        let bullet = bulletArr.pop();
        if (!bullet) {
            let bulletTpl = this.bulletTpl[type];
            bullet = cc.instantiate(bulletTpl);
            bullet.parent = bulletTpl.parent;
        }
        let BulletCtrl = require('BulletCtrl');
        bullet.getComponent(BulletCtrl).init(moveSpeed, dis, dir, type, x, y);
        bullet.active = true;
    },

    destroyBullet (bullet, type) {
        bullet.active = false;
        let bulletArr = this.bulletPool[type];
        bulletArr.push(bullet);
    }
});