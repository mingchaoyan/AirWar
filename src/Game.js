var Game = (function() {
    (function Game(){
        Laya.init(400, 852);
        this.bg = new BackGround();
        Laya.stage.addChild(this.bg);
    })();
})();