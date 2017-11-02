var SPRITE_WIDTH = 64; //物体宽
var SPRITE_HEIGHT = 64;//物体高
var DEBUG_NODE_SHOW = true;//调试遮罩


var HelloWorldLayer = cc.Layer.extend({
    space: null,
    ctor: function () {
        //////////////////////////////
        // 1. super init first
        this._super();


        this.initPhysics();


        this.scheduleUpdate();


    },
    setupDebugNode: function () {
        this._debugNode = new cc.PhysicsDebugNode(this.space);
        this._debugNode.visible = DEBUG_NODE_SHOW;
        this.addChild(this._debugNode);
    },
    onEnter: function () {
        this._super();
        cc.log("onEnter");
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this.onTouchBegan
        }, this);
    },
    onTouchBegan: function (touch, event) {
        cc.log("onTouchBegan");
        var target = event.getCurrentTarget();
        var location = touch.getLocation();
        target.addNewSpriteAtPosition(location);//产出新的盒子
        return false;
    },
    onExit: function () {
        this._super();
        cc.log("onExit");
        cc.eventManager.removeListeners(cc.EventListener.TOUCH_ONE_BY_ONE);
    },
    initPhysics: function () {


        var winSize = cc.director.getWinSize();

        //创建物理空间--------------------------------------------(A)
        this.space = new cp.Space();
        this.setupDebugNode();//设置调试node对象


        // 设置重力
        this.space.gravity = cp.v(0, -100);
        var staticBody = this.space.staticBody;//从物理空间获取静态物体


        // 设置空间边界
        var walls = [
            // bottom
            new cp.SegmentShape(staticBody, cp.v(cc.winSize.width/2, 0), cp.v(cc.winSize.width/2+180, 0), 0),
            // top
            new cp.SegmentShape(staticBody, cp.v(0, winSize.height/2), cp.v(0, winSize.height), 0),
            // left
            new cp.SegmentShape(staticBody, cp.v(0, 0), cp.v(0, winSize.height), 0),
            // right
            new cp.SegmentShape(staticBody, cp.v(winSize.width, 0), cp.v(winSize.width, winSize.height), 0)
        ];

        for (var i = 0; i < walls.length; i++) {
            var shape = walls[i];
            //弹性系数
            shape.setElasticity(0);
            //摩擦系数
            shape.setFriction(1);
            this.space.addStaticShape(shape);
        }

    },
    addNewSpriteAtPosition: function (p) {
        cc.log("addNewSpriteAtPosition");
        var SPRITE_HEIGHT = 64;//物体高
        var DEBUG_NODE_SHOW = true;//调试遮罩{
        cc.log("addNewSpriteAtPosition");
        //cp.Body构造函数创建了一个动态的物体，构造函数第一个参数是质量，这里的1是一个经验值，
        //可以通过它的大小而改变物体的物理特性
        //第二个参数是惯性，它决定了物体运动时候收到的阻力
        //设置惯性使用cp.momentForBox函数
        //cp.momentForBox函数是计算多边形的惯性值
        //cp.momentForBox第一个参数是惯性矩形，这的1也是个经验值，第二个参数是设置物体的宽度，第三个参数是物体的高度
        //类似的函数还有很多 如:cp.momentForBox、cp.momentForSegment和cp.momentForCircle等
        var body = new cp.Body(1, cp.momentForBox(1, SPRITE_WIDTH, SPRITE_HEIGHT));
        //设置物体中心(物体的几何中心)
        body.setPos(p);
        //添加物体到空间
        this.space.addBody(body);


        //创建形状对象
        var shape = new cp.BoxShape(body, SPRITE_WIDTH, SPRITE_HEIGHT);


        shape.setElasticity(0.5);
        shape.setFriction(0.5);
        this.space.addShape(shape);


        //创建物理引擎精灵对象
        //ccPhysicsSprite由cocos2d-JS提供的物理引擎对象，
        //用cc.PhysicsSprite类自动地将精灵和物理位置和旋转角度同步起来，
        //在游戏循环函数中需要简单的语句就可以实现同步，在update函数里面
        var sprite = new cc.PhysicsSprite("res/grid.png");
        sprite.setBody(body);
        sprite.setPosition(cc.p(p.x, p.y));
        this.addChild(sprite);
    },
    update: function (dt) {


        var timeStep = 0.03;
        //timeStep表示上一次过去循环的时间，它还影响到物体本次循环简要移动的距离和旋转角度
        //，不建议使用update的dt参数作为timeStep，因为dt时间是上下浮动的
        this.space.step(timeStep);
    },
    onExit: function () {


    }
});


var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});