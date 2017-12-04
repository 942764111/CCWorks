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
            function xins() {
                me.ui["xinshou"]["Tile"].runAction(
                    cc.repeatForever(cc.sequence(
                        cc.scaleTo(1,0.5,0.5),
                        cc.scaleTo(1,1,1)
                    ))
                );
                function CallBack() {
                    this.removeFromParent();
                    var index = 3;
                    function schedCallBack() {
                        if(index<=0){
                            GV.UI.tip_NB.show("游戏开始");
                            me.ui.unschedule(schedCallBack);
                            me.ui.scheduleOnce(function () {
                                me.GameControl(GC.GAME_RUN)
                            },4)
                        }else{
                            GV.UI.tip_NB.show(index);
                            index-=1;
                        }
                    }
                    me.ui.schedule(schedCallBack,1)
                }
                me.ui["xinshou"].touch(BC.CUIType.FL,CallBack);
            }

            me.GameControl(GC.GAME_INIT)
            xins();

        }
        ,GameControl : function (state) {
            var me = this;
            switch (state||'0'){
                case GC.GAME_INIT:
                    me.init();
                    break;
                case GC.GAME_RUN:
                    me.RunGame();
                    break;
                case GC.GAME_PASS:
                    break;
                case GC.GAME_OVER:
                    flax.inputManager.removeAllTouchListeners();
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
                    _Heros :{},
                    _isWin:false
                }
            }
            function initSpriteElement() {
                var Heros = me._Vessel["_Heros"];
                function initHero() {
                    var i = 0,Heroflaxres = GC["SPRITE_HERO"],data,obj;
                    for(;i<Heroflaxres.length;i++){
                        data = Heroflaxres[i];
                        obj = flax.assetsManager.createDisplay(resanimations[data["flaxres"]], data["flaxres"], {parent:me.ui, x:me.ui[data["flaxres"]].x, y:me.ui[data["flaxres"]].y});
                        obj["id"] = data["id"];
                        Heros[data["id"]] = obj;
                        obj.gotoAndPlay("idle");
                        me.debugDraw(obj,false);
                    }
                    me.ui["shuttlecock"].setVisible(false);
                }
                function initshuttlecock() {
                }
                initHero();
                initshuttlecock();
            }
            function initPhysics() {
                flax.createPhysicsWorld({x:0, y:0});
                flax.startPhysicsWorld();

                me.ui.createPhysics(flax.physicsTypeStatic);
                me.ui.addPhysicsShape("downBar", 1, 0.3, 0.5);

                me.ui.getCollider("downBar").debugDraw();
            }
            switch (type){
                case 'variables':break;
                case 'Sprite': initSpriteElement();break;
                default :
                    variables();
                   // initPhysics();
                    initSpriteElement();
                    break;
            }
        }
        ,RunGame : function () {
            var me = this,
                Heros = me._Vessel["_Heros"],
                shuttlecock = me.ui["shuttlecock"],
                getActiveHero,
                getClientHero = Heros["1"];
            function RandomObjAndPlay(MoveToObj) {
                function initElement() {
                    function RandomObj() {
                        var hero;
                        do{
                            hero = Heros[GN.Num.randomNumber(1,3)+""]
                        }while(getActiveHero&&hero['id']==getActiveHero['id']);
                        return hero
                    }
                        if(!getActiveHero){
                            getActiveHero = Heros[GN.Num.randomNumber(1,3)]
                            if(getActiveHero["id"]==getClientHero["id"]){
                                getActiveHero.fps = 60;
                            }

                            me.playAttack(getActiveHero);

                            me.ui["shuttlecock"].setVisible(true);
                        }
                    MoveToObj = MoveToObj?MoveToObj:RandomObj();

                    var AHworldpos =getActiveHero["pos"].parent.convertToWorldSpace(getActiveHero["pos"]);
                    shuttlecock.setPosition(cc.p(AHworldpos.x,AHworldpos.y));

                    if(getActiveHero["id"]==Heros["2"]["id"]){
                        shuttlecock.setScale(0.6);
                    }

                    var rot = flax.getAngle(shuttlecock.getPosition(), MoveToObj);
                    if(rot > 180) rot -= 360;
                    rot = Math.max(-65, rot);
                    rot = Math.min(65, rot);
                    shuttlecock.setRotation(rot)
                }
                function PlayAction() {
                    //Action    parameter
                    function GetAction(){
                        function setRotateBy() {
                            return cc.rotateBy(1.5,200);
                        }
                        function setBezierTo() {
                            var controlPoints;
                            var raworldpos =MoveToObj["pos"].parent.convertToWorldSpace(MoveToObj["pos"]);
                            var AHworldpos =getActiveHero["pos"].parent.convertToWorldSpace(getActiveHero["pos"]);
                                controlPoints = [cc.p(AHworldpos.x,cc.winSize.height),
                                    cc.p(Math.abs(AHworldpos.x+raworldpos.x)/2, cc.winSize.height),
                                    cc.p(raworldpos.x, raworldpos.y)]
                            return cc.bezierTo(1.5, controlPoints)
                        }
                        function setScaleTo() {
                            if(MoveToObj["id"]==Heros["2"]["id"]){
                                return cc.scaleTo(1.5,0.6);
                            }
                            return cc.scaleTo(1.5,1);
                        }
                        function setDelayTime() {
                            return cc.delayTime(0.1);
                        }
                        function setCallFunc(type) {
                            switch(type){
                                case "Action":
                                   return new cc.CallFunc(function () {
                                        function CallBack() {
                                            if(MoveToObj["collide"]&& flax.ifCollide(shuttlecock,MoveToObj["collide"])){
                                                function playA() {
                                                    me.playAttack(MoveToObj);
                                                }
                                                    if(MoveToObj["id"]==getClientHero["id"]){
                                                        clientPlay();
                                                    }else{
                                                        playA();
                                                    }
                                                me.ui.unschedule(CallBack);
                                            }
                                        }
                                        me.ui.schedule(CallBack,0.1)
                                    })
                                case "Over":
                                   return new cc.CallFunc(function () {
                                       getActiveHero = MoveToObj;
                                       if(!me._Vessel._isWin&&MoveToObj["id"]==getClientHero["id"]){
                                           me.GameControl(GC.GAME_OVER);
                                           shuttlecock.runAction(
                                               cc.spawn(
                                                   cc.moveBy(0.1,0,-(Math.abs(shuttlecock.y-getClientHero.y))+10)
                                                   ,cc.rotateTo(0.1,65)
                                               )
                                           );
                                           GV.UI.tip_NB.show("游戏失败..请等待");
                                           me.ui.scheduleOnce(function () {
                                               GM.SceneMage.replaceScene("GameMove");
                                           },3)
                                       }else{
                                           AIPlay();
                                       }
                                       me._Vessel._isWin = false;
                                       // PlayShuttlecock(MoveToObj);
                                })
                                default :GN.ErrorLog(type+":type not Find")
                            }

                        }
                        return{
                            "rotateBy":setRotateBy(),
                            "BezierTo":setBezierTo(),
                            "scaleTo":setScaleTo(),
                            "delayTime":setDelayTime(),
                            "playOverCall":setCallFunc("Over"),
                            "playActionCall":setCallFunc("Action")
                        }
                    }

                    var getA = GetAction();
                    shuttlecock.runAction(
                        new cc.sequence(cc.spawn(
                            getA["BezierTo"]
                            ,getA["rotateBy"]
                            ,getA["scaleTo"]
                            ,getA["playActionCall"]
                            )
                            ,getA["delayTime"],getA["playOverCall"])
                    );
                }
                initElement();
                PlayAction();
            }
            function clientPlay() {
                function CallBackEvents(touch,event) {
                    var pos = touch.getLocation(),self = this;
                    if(getClientHero["collide"]&&flax.ifCollide(shuttlecock,getClientHero["collide"])){
                        me._Vessel._isWin = true;
                        getClientHero.fps=60;
                        me.playAttack(getClientHero);
                        flax.inputManager.removeAllTouchListeners();
                    }
                }
                me.ui.touch(BC.CUIType.FL,CallBackEvents,getClientHero);

            }
            function AIPlay() {
                RandomObjAndPlay();
            }
             function PlayShuttlecock(Type) {
                 switch(Type&&Type["id"]||""){
                     case getClientHero["id"]:
                         clientPlay();
                         break;
                     default :
                         AIPlay()
                         break;
                 }
             }
            PlayShuttlecock();
        }
        ,debugDraw :function (hero,isVisible) {
            var me = this;
            hero["collide"].setVisible(isVisible);
            hero["pos"].setVisible(isVisible);
        }
        ,playAttack : function (hero,fun) {
            var me = this;
            hero.gotoAndPlay("attack");
            me.debugDraw(hero,false);
            hero.onAnimationOver.add(function (sprite) {
                if(hero["id"]=="1"){
                    this.fps = 30;
                }
                this.gotoAndPlay("idle");
                me.debugDraw(this,false);
                fun&&fun();
            }, hero);
        }
        ,close: function(){

        }
    });

    GM.UIMage.BindUIByID(ID,new fun(resGameMove.GameMove,ID,BC.CUIType.FL));
})();
