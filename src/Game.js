var Game = (function() {
    (function Game(){
        Laya.init(400, 852);
        this.bg = new BackGround();
        Laya.stage.addChild(this.bg);
        Laya.loader.load("res/atlas/war.json", Laya.Handler.create(this, onLoaded), null, Laya.Loader.ATLAS);
    })();
    function onLoaded() {
        this.hero = new Role();
        this.hero.pos(200, 500);
        Laya.stage.addChild(this.hero);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, onmousemove);
    }
    function onmousemove() {
        this.hero.pos(Laya.stage.mouseX, Laya.stage.mouseY);
    }
})();