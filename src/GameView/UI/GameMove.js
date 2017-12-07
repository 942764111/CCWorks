/**
 * Created by jorbeen on 2017/8/30.
 */
(function(){
    var ID = 'GameMove';

    var fun = GM.UIMage.UIBase.extend({
        _Vessel : null,//全局引用容器
        _isGuide:false,//新手引导开关    true为关   false为开
        ctor: function(json,id,type){
            this._super(json,id,type);
        },
        show : function(){
            this._super(this.showed);
        },
        showed : function() {
            var me = this;
            me.GameControl()
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
                    me.ui["xstouch"].setVisible(false);
                    me.ui["xinshou"].setVisible(false);
                    
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
        ,GuideManage : function (GUIDEindex,fun) {
            var me = this,
                GUIDEindex = GUIDEindex,
                Heros = me._Vessel["_Heros"];
                me.ui["xinshouLable"].setLocalZOrder(1000);
                me.ui["xinshouLable2"].setLocalZOrder(1000);
                me.ui["xstouch"].setLocalZOrder(1000);

                function touchLayer() {

                    function CallBackEvents() {
                        flax.inputManager.removeAllTouchListeners();
                        overGuide();
                        fun&&fun();
                    }
                    me.ui.touch(BC.CUIType.FL,CallBackEvents,me);
                }
            /**
             * 显示遮罩层
             */
            function showMask(objs,isshow) {
                var stencil;
                if (!isshow) {
                    if (me._clipper) {
                        me._clipper.setVisible(false);
                    }
                    return;
                }

                if (!me._clipper) {
                    stencil = new cc.LayerColor();//cc.DrawNode();
                    var clipper = new cc.ClippingNode();
                    clipper.stencil = stencil;
                    me.ui.addChild(clipper, 888);
                    clipper.setInverted(true);
                    var content = new cc.LayerColor(cc.color("#0000"),cc.winSize.width+100,cc.winSize.height+100);
                    content.setOpacity(150);
                    clipper.addChild(content,999);
                    me._clipper = clipper;
                } else {
                    stencil = me._clipper.stencil;
                }
                me._clipper.setVisible(true);
                stencil.setContentSize(250, 350);
                var AHworldpos =objs.parent.convertToWorldSpace(objs);
                stencil.setPosition(AHworldpos.x-100, AHworldpos.y);
            }
            function showTouch(isshow) {
                me.ui["xinshouLable2"].setVisible(isshow);
                if(isshow){
                    me.ui["xinshouLable2"].text ="点击任意位置继续";
                }else{
                    me.ui["xinshouLable2"].text ="";
                }
            }
            function showTouchAdmin(isshow) {
                me.ui["xstouch"].setVisible(isshow);
                if(isshow){
                    me.ui["xstouch"].play();
                }else{
                    me.ui["xstouch"].stop();
                }
            }
            function overGuide() {
                showTouch(false);
                showMask(null,false);
                showTouchAdmin(false);
                me.ui["xinshouLable"].text = ""
            }
            //执行步揍方法
            function Two() {
                me.ui["xinshouLable"].text =GC["GUIDE"][GUIDEindex]["title"]
                me.ui["xinshouLable"].setVisible(false)
                var index = 1
                function scheduleCallBack() {
                    index  = index>3?1:index;
                    showMask(Heros[index],true);
                    me.ui["xinshouLable"].setVisible(true);
                    index++;
                }
                function scheduleOnceCallBack() {
                    me.ui.unschedule(scheduleCallBack)
                    showMask(Heros[3],true);
                    showTouch(true);
                    touchLayer();
                }
                me.ui.schedule(scheduleCallBack,1.5)
                me.ui.scheduleOnce(scheduleOnceCallBack,8)

            }
            function Three() {
                me.ui["xinshouLable"].text =GC["GUIDE"][GUIDEindex]["title"]
                me.ui["xinshouLable"].setVisible(true)
                showMask(Heros[2],true);
                function scheduleOnceCallBack2() {
                    me.ui.unschedule(scheduleOnceCallBack2)
                    showTouch(true);
                    touchLayer();
                }
                me.ui.scheduleOnce(scheduleOnceCallBack2,1)

            }
            function For() {
                me.ui["xinshouLable"].text =GC["GUIDE"][GUIDEindex]["title"]
                me.ui["xinshouLable"].setVisible(true)
                showMask(Heros[1],true);
                function scheduleOnceCallBack2() {
                    me.ui.unschedule(scheduleOnceCallBack2)
                    showTouchAdmin(true);
                    touchLayer();
                }
                me.ui.scheduleOnce(scheduleOnceCallBack2,1)

            }
            function Five() {
                me.ui["xinshouLable"].text =GC["GUIDE"][GUIDEindex]["title"]
                me.ui["xinshouLable"].setVisible(true)
                showMask(Heros[1],true);
                function scheduleOnceCallBack2() {
                    me.ui.unschedule(scheduleOnceCallBack2)
                    showTouch(true);
                    touchLayer();
                }
                me.ui.scheduleOnce(scheduleOnceCallBack2,1)
            }
            function Six() {
                me.ui["xinshou"].setVisible(true);
                function xins() {
                    var index = 3;
                    me.ui["xinshouLable"].text =GC["GUIDE"][GUIDEindex]["title"]
                    me.ui["xinshou"]["time"].text = index;
                    function schedCallBack() {
                        if(index<=0){
                            me.ui["xinshouLable"].text = "游戏开始";
                            me.ui.unschedule(schedCallBack);
                            me.ui.scheduleOnce(function () {
                                overGuide();
                                me.ui["xinshou"].removeFromParent();
                                fun&&fun();
                            },1)
                        }else{
                            index-=1;
                        }
                        me.ui["xinshou"]["time"].text = index;
                    }
                    me.ui.scheduleOnce(function () {
                        me.ui.schedule(schedCallBack,1)
                    },1)
                }
                xins();
            }
            switch(GUIDEindex){
                case 1:
                    break;
                case 2:
                    Two();
                    break;
                case 3:
                    Three();
                    break;
                case 4:
                    For();
                    break;
                case 5:
                    Five();
                    break;
                case 6:
                    Six();
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
                var Torot = 0;
                function initElement() {
                    function RandomObj() {
                        var hero;
                        do{
                            hero = Heros[GN.Num.randomNumber(1,3)+""]
                        }while(getActiveHero&&hero['id']==getActiveHero['id']);
                        return hero
                    }
                        if(!getActiveHero){
                            getActiveHero = me._isGuide?Heros[GN.Num.randomNumber(1,3)]:Heros["3"]
                            if(getActiveHero["id"]==getClientHero["id"]){
                                getActiveHero.fps = 60;
                            }

                            me.playAttack(getActiveHero);

                            me.ui["shuttlecock"].setVisible(true);
                        }
                    MoveToObj = MoveToObj?MoveToObj:RandomObj();

                    var AHworldpos =getActiveHero["pos"].parent.convertToWorldSpace(getActiveHero["pos"]);
                    var MoveToObjWorldpos =MoveToObj["pos"].parent.convertToWorldSpace(MoveToObj["pos"]);
                    shuttlecock.setPosition(cc.p(AHworldpos.x,AHworldpos.y));

                    if(getActiveHero["id"]==Heros["2"]["id"]){
                        shuttlecock.setScale(0.6);
                    }
                    //To  rot
                    Torot = flax.getAngle(MoveToObj, shuttlecock)
                    if(Torot>=250)
                        Torot = GN.Num.randomNumber(280,360);
                        else
                        Torot = GN.Num.randomNumber(0,60);

                    shuttlecock.setRotation(180)
                }
                function PlayAction() {
                    //Action    parameter
                    function GetAction(){
                        function setRotateBy() {
                            return cc.rotateTo(1.5,Torot);
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
                                                    if(MoveToObj["id"]==getClientHero["id"]&&me._isGuide){
                                                       // clientPlay();
                                                    }else if(!(MoveToObj["id"]==getClientHero["id"])){
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

                                           if(!me._isGuide){
                                               MoveToObj.stop();
                                               shuttlecock.stopAllActions();
                                               me.GuideManage(4,function () {
                                                   me.GuideManage(5,function () {
                                                       me.GuideManage(6,function(){
                                                           me._isGuide = true
                                                           GM.SceneMage.replaceScene("GameMove");
                                                       })
                                                   })
                                               })

                                           }else{
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
                                           }
                                       }else{
                                           if(!me._isGuide){
                                               MoveToObj.stop();
                                               shuttlecock.stopAllActions();
                                               me.GuideManage(3,function () {
                                                   MoveToObj.play();
                                                   cc.director.resume();
                                                   RandomObjAndPlay(Heros["1"]);
                                               })
                                           }else {
                                               AIPlay();
                                           }
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
                var isTouchEnabled = true;
                function CallBackEvents(touch,event) {
                    var pos = touch.getLocation(),self = this;
                     function playHeroAdmin() {
                        if (me._isGuide) {
                            if(getClientHero["collide"] && flax.ifCollide(shuttlecock, getClientHero["collide"])){
                                me._Vessel._isWin = true;
                            }
                            getClientHero.fps = 60;
                            me.playAttack(getClientHero);
                        }
                    }
                     if(isTouchEnabled){
                         isTouchEnabled = false;
                         playHeroAdmin();
                         me.ui.scheduleOnce(function () {
                             isTouchEnabled = true;
                         },1);
                     }
                }
                me.ui.touch(BC.CUIType.FL,CallBackEvents,me);
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
            if(me._isGuide){
                me.ui.scheduleOnce(function () {
                    PlayShuttlecock();
                    clientPlay();
                },2)
                GV.UI.tip_NB.show("游戏开始");
            } else{
                me.GuideManage(2,function () {
                    RandomObjAndPlay(Heros["2"]);
                })
            }
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
            var me = this;
            me._clipper = null;
            me._Vessel = {
                _Heros :{},
                _isWin:false,
            }
        }
    });

    GM.UIMage.BindUIByID(ID,new fun(resGameMove.GameMove,ID,BC.CUIType.FL));
})();
