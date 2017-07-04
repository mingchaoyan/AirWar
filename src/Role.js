var Role = (function(_super){
    function Role() {
        console.log("Role");
        Role.super(this);
        //this.init();
    }
    Role.cached = false;
    Laya.class(Role, "Role", _super);
    var _proto = Role.prototype;
    _proto.init = function(_type, _camp, _hp, _speed, _hitRadius, _heroType = 0) {
        //this.body = null;
        console.log(_type);
        this.type = _type;
        // 0 我方 1 敌方
        this.camp = _camp;
        this.hp = _hp;
        this.speed = _speed;
        this.hitRadius = _hitRadius;
        //0 飞机，1子弹 2 药包 3 补给
        this.heroType = _heroType;
        this.shootType = 0;
        this.shootInterval = 500;
        this.shootTime = Laya.Browser.now()+2000;
        this.action = "";
        this.isBullet = false;
        if (!Role.cached) {
            Role.cached = true;
            Laya.Animation.createFrames(["war/hero_fly1.png", "war/hero_fly2.png"], "hero_fly");
            Laya.Animation.createFrames(["war/hero_down1.png", "war/hero_down2.png", "war/hero_down3.png", "war/hero_down4.png"], "hero_down");

            Laya.Animation.createFrames(["war/enemy1_fly1.png"], "enemy1_fly");
            Laya.Animation.createFrames(["war/enemy1_down1.png", "war/enemy1_down2.png", "war/enemy1_down3.png", "war/enemy1_down4.png"], "enemy1_down");

            Laya.Animation.createFrames(["war/enemy2_fly1.png"], "enemy2_fly");
            Laya.Animation.createFrames(["war/enemy2_down1.png", "war/enemy2_down2.png", "war/enemy2_down3.png", "war/enemy2_down4.png"], "enemy2_down");
            Laya.Animation.createFrames(["war/enemy2_hit.png"], "enemy2_hit");
            
            Laya.Animation.createFrames(["war/enemy3_fly1.png", "war/enemy3_fly2.png"], "enemy3_fly");
            Laya.Animation.createFrames(["war/enemy3_down1.png", "war/enemy3_down2.png", "war/enemy3_down3.png", "war/enemy3_down4.png", "war/enemy3_down5.png", "war/enemy3_down6.png"], "enemy3_down");
            Laya.Animation.createFrames(["war/enemy3_hit.png"], "enemy3_hit");

            Laya.Animation.createFrames(["war/bullet1.png"], "bullet1_fly");

            Laya.Animation.createFrames(["war/ufo1.png"], "ufo1_fly");
            Laya.Animation.createFrames(["war/ufo2.png"], "ufo2_fly");
        }
        if (!this.body) {
            this.body = new Laya.Animation();
            this.addChild(this.body);

            this.body.on(Laya.Event.COMPLETE, this, this.onPlayComplete);
        }
        this.playAction("fly");
    }
    _proto.onPlayComplete = function() {
        if(this.action == "down") {
            this.body.stop();
            this.visible = false;
        } else if (this.action == "hit"){
            this.playAction("fly");
        }
    }

    _proto.playAction = function(action) {
        this.action = action;
        this.body.play(0, true, this.type + "_"+this.action);
        this.bound = this.body.getBounds();
        this.body.pos(-this.bound.width/2, -this.bound.height/2);
    }
    return Role;
})(Laya.Sprite);