let RoleMove = require('RoleMove');
let RoleAttack = require('RoleAttack');
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    start () {
        this.state = 'choose';
        this.curTime = 0.5;
        this.toMoveTime = 0.5;
        this.toStopTime = 1;
        this.toChooseTime = 0.5;
        this.toCol = -1;
        this.toRow = -1;
        this.moveComp = this.node.getComponent(RoleMove);
        this.attackComp = this.node.getComponent(RoleAttack);
    },

    update (dt) {
        if (this.state == "choose") {
            this.curTime += dt;
            if (this.curTime > this.toChooseTime) {
                this.curTime = 0;
                
                let randomVal = Math.random();
                if (randomVal < 0.25) {
                    this.moveComp.move(this.moveComp.dir != 'left'?'left':'right');
                } else if (randomVal < 0.5) {
                    this.moveComp.move(this.moveComp.dir != 'right'?'right':'left');
                } else if (randomVal < 0.75) {
                    this.moveComp.move(this.moveComp.dir != 'up'?'up':'down');
                } else {
                    this.moveComp.move(this.moveComp.dir != 'down'?'down':'up');
                }

                // let rect = cc.visibleRect;
                // let halfWidth = rect.width * 0.5;
                // let halfHeight = rect.height * 0.5;
                // // 1
                // if (this.node.x > halfWidth && this.node.y > halfHeight) {
                //     this.moveComp.move(Math.random() > 0.5 ? 'left' : 'down');
                // // 2
                // } else if (this.node.x < halfWidth && this.node.y > halfHeight) {
                //     this.moveComp.move(Math.random() > 0.5 ? 'right' : 'down');
                // // 3
                // } else if (this.node.x < halfWidth && this.node.y < halfHeight) {
                //     this.moveComp.move(Math.random() > 0.5 ? 'up' : 'right');
                // // 4
                // } else if (this.node.x > halfWidth && this.node.y < halfHeight) {
                //     this.moveComp.move(Math.random() > 0.5 ? 'left' : 'up');
                // }
                this.state = 'attack';
            }
        } else if (this.state == 'attack') {
            this.attackComp.attack();
            this.curTime = 0;
            this.state = 'move';
        } else if (this.state == "move") {
            this.curTime += dt;
            // wait for toMoveTime to walk
            if (this.curTime > this.toMoveTime) {
                this.curTime = 0;
                // next state is stop
                this.state = "stop";
                this.moveComp.move(this.moveComp.dir);
            }
        } else if (this.state == 'stop') {
            // wait for toStopTime to stop
            this.curTime += dt;
            this.toChooseTime = 1 + Math.random() * 1;
            if (this.toChooseTime < this.curTime || this.moveComp.state == 'stop') {
                this.curTime = 0;
                this.toChooseTime = 0;
                this.state = "choose";
                this.moveComp.move('stop');
            }
        }
    },
});