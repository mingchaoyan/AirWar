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
                if(role.y>1000) {
                    role.removeSelf();
                    Laya.Pool.recover("role", role);
                }
            }
        }
        if(Laya.timer.currFrame%60 === 0) {
            createEnemy(2);
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