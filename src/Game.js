var Game = (function() {
    (function Game(){
        console.log("before");
        console.log("Game");
        console.log("after");
        this.bulletPos = [[0], [-15, 15], [-30, 0, 30], [-45, -15, 15, 45]];
        this.level = 0;
        this.scroe = 0;
        this.levelUpScore = 0;
        this.bulletLevel = 0;
        this.hps = [1, 2, 1];
        this.speed = [3, 2, 1];
        this.radius = [15, 30, 70];
        Laya.init(400, 852);
        this.bg = new BackGround();
        Laya.stage.addChild(this.bg);
        Laya.loader.load("res/atlas/war.json", Laya.Handler.create(this, onLoaded), null, Laya.Loader.ATLAS);
    })();
    function onLoaded() {
        this.hero = new Role();
        this.hero.init("hero", 0, 1, 0, 30);
        this.hero.shootType = 1;
        this.hero.pos(200, 500);
        Laya.stage.addChild(this.hero);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, onMouseMove);
        Laya.timer.frameLoop(1, this, onLoop);
    }
    function onLoop() {
        for(var i = Laya.stage.numChildren - 1; i>0; i--) {
            var role = Laya.stage.getChildAt(i);
            if(role && role.speed) {
                role.y+=role.speed;
                if(role.y>1000 || !role.visible || (role.isBullet&&role.y<-20)) {
                    role.removeSelf();
                    role.isBullet = false;
                    role.visible = true;
                    Laya.Pool.recover("role", role);
                }
            }
            if(role.shootType >0) {
                var time = Laya.Browser.now();
                if(time>role.shootTime) {
                    role.shootTime = time+role.shootInterval;
                    this.pos = this.bulletPos[role.shootType - 1];
                    for(var index = 0; index<pos.length;index++) {
                        var bullet = Laya.Pool.getItemByClass("role", Role);
                        bullet.init("bullet1", role.camp, 1, -4-role.shootType-Math.floor(this.level/15), 1, 1);
                        bullet.isBullet = true;
                        bullet.pos(role.x+pos[index], role.y-role.hitRadius-10);
                        Laya.stage.addChild(bullet);
                    }
                }
            }
        }
        
        for(var i = Laya.stage.numChildren-1;i>0;i--) {
            var role1 = Laya.stage.getChildAt(i);
            if(role.hp<1) continue;
            for(var j=i-1;j>0;j--) {
                if(!role1.visible) continue;
                var role2 = Laya.stage.getChildAt(j);
                if(role2.hp>0 && role1.camp != role2.camp) {
                    var hitRadius = role1.hitRadius = role2.hitRadius;
                    if(Math.abs(role1.x-role2.x)<hitRadius && Math.abs(role1.y - role2.y) < hitRadius) {
                        lostHp(role1, 1);
                        lostHp(role2, 1);

                        this.scroe ++;
                        if(this.score > this.levelUpScore) {
                            this.level++;
                            this.levelUpScore += this.level * 5;
                        }

                    }
                }
            }
        }
        if(this.hero.hp<1) {
            Laya.timer.clear(this.onLoop);
        }
        //if(Laya.timer.currFrame%60 === 0) {
        //    createEnemy(2);
        //}
        var cutTime = this.level < 30 ? this.level * 2 : 60;
        var speedUp = Math.floor(this.level / 6);
        var hpUp = Math.floor(this.level/8);
        var numUp = Math.floor(this.level/10);
        if(Laya.timer.currFrame % (80 - cutTime) === 0) {
            createEnemy(0, 2+numUp, 3+speedUp, 1);
        }
        if(Laya.timer.currFrame % (150 - cutTime * 4) === 0) {
            createEnemy(1, 1 +numUp, 2+speedUp, 2+hpUp * 2);
        }
        if(Laya.timer.currFrame % (900 - cutTime * 4) === 0) {
            createEnemy(2, 1, 2+speedUp, 2+hpUp * 6);
        }
    }

    function lostHp(role, lostHp) {
        role.hp-=lostHp;
        if(role.heroType == 2) {
            this.bulletLevel++;
            this.hero.shootType = Math.min(Math.floor(this.bulletLevel/2) + 1, 4);
            this.hero.shootInterval = 500 - 20 * (this.bulletLevel>20 ?20:this.bulletLevel);
            role.visible  = false;
        } else if (role.heroType == 3) {
            this.hero.hp ++ ;
            if(this.hero.hp > 10) {
                this.hero.hp = 10;
            }
            role.visible = false;
        }
        if(role.hp>0) {
            role.playAction("hit");
        } else {
            if(role.heroType > 0) {
                role.visible = false;
            } else {
                role.playAction("down");
                if(role.type == "enemy3") {
                    var type = Math.random() < 0.7 ? 2: 3;
                    var item = Laya.Pool.getItemByClass("role", Role);
                    item.init("ufo" + (type - 1), role.camp, 1, 1, 15, type);
                    item.pos(role.x, role.y);
                    Laya.stage.addChild(item);
                }
            }
        }
    }
    function onMouseMove() {
        this.hero.pos(Laya.stage.mouseX, Laya.stage.mouseY);
    }
    this.bulletPos = [[0], [-15, 15], [-30, 0, 30], [-45, -15, 15, 45]];
    this.level = 0;
    this.scroe = 0;
    this.levelUpScore = 0;
    this.bulletLevel = 0;
    this.hps = [1, 2, 1];
    this.speed = [3, 2, 1];
    this.radius = [15, 30, 70];
    function createEnemy(type, num, speed, hp) {
        for(var i=0;i<num;i++) {
            var enemy = Laya.Pool.getItemByClass("role", Role);
            enemy.init("enemy" + (type+1), 1, hp, speed, this.radius[type]);
            enemy.pos(Math.random()*400+40, Math.random()*100);
            Laya.stage.addChild(enemy);
        }
    }
})();