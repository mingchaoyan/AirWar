var Role = (function(_super){
    function Role() {
        Role.super(this);
        this.init();
    }
    Laya.class(Role, "Role", _super);
    var _proto = Role.prototype;
    _proto.init = function() {
        Laya.Animation.createFrames(["war/hero_fly1.png", "war/hero_fly2.png"], "hero_fly");
        Laya.Animation.createFrames(["war/hero_down1.png", "war/hero_down2.png", "war/hero_down3.png", "war/hero_down4.png"], "hero_down");
        this.body = new Laya.Animation();
        this.addChild(this.body);
        this.playAction("hero_down");
    }

    _proto.playAction = function(action) {
        this.body.play(0, true, action);
        this.bound = this.body.getBounds();
        this.body.pos(-this.bound.width/2, -this.bound.height/2);
    }
    return Role;
})(Laya.Sprite);