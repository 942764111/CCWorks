/**
 * Created by jorbeen on 2017/8/30.
 */
(function(){
    var ID = 'GameMove';

    var fun = GM.UIMage.UIBase.extend({
        _Vessel : null,//全局引用容器
        ctor: function(json,id,type){
            this._super(json,id,type);
        },
        show : function(){
            this._super(this.showed);
        },
        showed : function() {
            var me = this;

            me.ui.setAnchorPoint(0.5,0.5);
            me.GameControl();
        }
        ,GameControl : function (state) {
            var me = this;
            switch (state||0&&state.toString()){
                case GC.GAME_INIT:
                    me.init();
                    break;
                case GC.GAME_RUN:
                    me.RunGame();
                    break;
                case GC.GAME_PASS:
                    break;
                case GC.GAME_OVER:
                    break;
                default:
                    me.init();
                    me.RunGame();
                    break
            }
        }
        ,init : function(type){
            var me = this;
            function variables() {
                me._Vessel = {
                }
            }
            function initPhysics() {
                flax.createPhysicsWorld({x:0, y:0});
                flax.startPhysicsWorld();

                me.ui.createPhysics(flax.physicsTypeStatic);
                me.ui.addPhysicsShape("topBar", 1, 0.3, 0.5);
                me.ui.addPhysicsShape("leftBar", 1, 0.3, 0.5);
                me.ui.addPhysicsShape("rightBar", 1, 0.3, 0.5);
                me.ui.addPhysicsShape("downBar", 1, 0.3, 0.5);
                me.ui.addPhysicsShape("AI", 1, 0.3, 0.5);
            }
            function initBindEvents() {
                me.gun = me.ui['gun'];
                flax.inputManager.addListener(me.ui['back'], me.onClick, InputType.click, me);
            }
            switch (type){
                case 'variables':break;
                case 'Physics':break;
                default :
                    variables();
                    initPhysics();
                    initBindEvents();
                    break;
            }
        }
        ,onClick : function (touch, event) {
            var pos = touch.getLocation();
            var rot = flax.getAngle(this.gun.getPosition(), pos);
            if(rot > 180) rot -= 360;
            rot = Math.max(-65, rot);
            rot = Math.min(65, rot);
            this.gun.rotation = rot;

            var anchor = this.gun.getAnchor("shoot");
            pos = cc.p(anchor.x, anchor.y);
            pos = this.gun.convertToWorldSpace(pos);

            var ball = flax.assetsManager.createDisplay(resGameMove.GameMove, "b" + flax.randInt(0, 5), {parent:this.ui, zIndex: 99}, true);
            ball.setPosition(pos);
            ball.createPhysics(flax.physicsTypeDynamic, false, true);
            ball.addPhysicsShape("main", 1, 0.3, 0.7);
            var v = flax.getPointOnCircle(cc.p(), 2000, rot);
            ball.physicsBody.SetLinearVelocity({x: v.x/PTM_RATIO, y: v.y/PTM_RATIO});

            flax.clearDraw();
            var pos1 = flax.getPointOnCircle(pos, 600, rot);
            flax.physicsRaycast(function(collider,collisionPoint, endPoint, fraction){
                if(collider.name != "leftBar" && collider.name != "rightBar") return;
                flax.drawLine(pos, collisionPoint, 1, cc.color(0, 255, 0));
                flax.drawDot(collisionPoint);
                flax.drawLine(collisionPoint, endPoint);
            }, pos, pos1, 24);
        }
        ,RunGame : function () {
            var me = this;
        }
        ,close: function(){

        }
    });

    GM.UIMage.BindUIByID(ID,new fun(resGameMove.GameMove,ID,BC.CUIType.FL));
})();
