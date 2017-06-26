var Game = (function() {
    (function Game(){
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
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, onmousemove);
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
        }
        if(role.shootType >0) {
            var time = Laya.Browser.now();
            if(time>role.shootTime) {
                role.shootTime = time+role.shootInterval;
                var bullet = Laya.Pool.getItemByClass("role", Role);
                bullet.init("bullet1", role.camp, 1, -5, 1);
                bullet.isBullet = true;
                bullet.pos(role.x, role.y-role.hitRadius-10);
                Laya.stage.addChild(bullet);
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
                    }
                }
            }
        }
        if(this.hero.hp<1) {
            Laya.timer.clear(this.onLoop);
        }
        if(Laya.timer.currFrame%60 === 0) {
            createEnemy(2);
        }
    }

    function lostHp(role, lostHp) {
        role.hp-=lostHp;
        if(role.hp>0) {
            role.playAction("hit");
        } else {
            if(role.isBullet) {
                role.visible = false;
            } else {
                role.playAction("down");
            }
        }
    }
    function onmousemove() {
        this.hero.pos(Laya.stage.mouseX, Laya.stage.mouseY);
    }
    this.hps = [1, 2, 10];
    this.speed = [3, 2, 1];
    this.radius = [15, 30, 70];
    function createEnemy(num) {
        for(var i=0;i<num;i++) {
            var r = Math.random();
            var type = r<0.7?0:r<0.95?1:2;
            var enemy = Laya.Pool.getItemByClass("role", Role);
            enemy.init("enemy" + (type+1), 1, this.hps[type], this.speed[type], this.radius[type]);
            enemy.pos(Math.random()*400+40, Math.random()*100);
            Laya.stage.addChild(enemy);
        }
    }
})();