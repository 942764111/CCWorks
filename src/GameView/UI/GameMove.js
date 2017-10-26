/**
 * Created by jorbeen on 2017/8/30.
 */
(function(){

    cc.CleanUp = {};
    cc.CleanUp.touchB = true;
    cc.CleanUp.create = function (sprite)
    {
        return cc.CallFunc.create(function ()
        {
            sprite.cleanuped = true;
            sprite.removeFromParent(true);
        });
    };

    cc.MySprite = {};
    cc.MySprite.create = function (node, frameName, position, ZOrder)
    {
        node = node?node: GN.GetRunScene();
        var sprite = new cc.Sprite(frameName);
        sprite.setPosition(cc.p(position.x,position.y));
        sprite.setLocalZOrder(ZOrder);
        sprite.setAnchorPoint(cc.p(0.5, 0.5));
        node.addChild(sprite);
        return sprite;
    };

    cc.MySprite.createFlash = function (node, name, pBegin, pEnd)
    {
        var flash = cc.MySprite.create(node, name, pEnd, 40);
         var ratio = (pEnd.y - pBegin.y) / (pEnd.x - pBegin.x);
         var angle = (Math.atan(ratio) / (Math.PI)) * 180;
         flash.setRotation(-angle);
        flash.setScale(0.5);
        flash.delay(3).then(function () {
            this.removeFromParent();
        },flash).run();
        return flash;
    };

    var ID = 'GameMove';

    var fun = GM.UIMage.UIBase.extend({
        pBegin : 255,
        isCrash: true,
        Score:0,
        he:17,
        ctor: function(json,id,type){
            this._super(json,id,type);
        },
        show : function(){
            this._super(this.showed);
        },
        showed : function() {
            var me = this;


            var dou = GN.ccsSprite('tishiimg.png',{
                x:cc.winSize.width/2,
                y:cc.winSize.height/2
            });
            this.ui.addChild(dou,10);

            //拖影
            me.ui._streak = new cc.MotionStreak(0.5, 2, 35, cc.color.WHITE,resGameMove.flash);
            me.ui._streak.setPosition(cc.p(cc.winSize.width / 2,cc.winSize.height / 2));
            GN.GetRunScene().addChild(me.ui._streak,8000);

            me.ui['zt_btn'].touch(BC.CUIType.FL,function (touch,event) {
                GV.UI['Pause'].show();
            },me);



            var kong;
            var rand;
             var data = {
                 '1':{'max':55,'min':14},
                 '2':{'max':30,'min':15},
                 '3':{'max':35,'min':5},
                 '4':{'max':10,'min':1},
                 '5':{'max':15,'min':1},
                 '6':{'max':20,'min':1}
             };
            var kaishi;
            function Getkong() {


                me.ui['huihe'].setString(me.he);


                kaishi = flax.assetsManager.createDisplay(resGameMove.kaishi, "dh", {
                });
                kaishi.x = cc.winSize.width/2;
                kaishi.y = cc.winSize.height/2;
                kaishi.fps = 15;
                kaishi.autoHideWhenOver = true;
                kaishi.play();
                me.ui.addChild(kaishi,80);


                rand = GN.Num.randomNumber(1,6);
                kong = me.ui['kong'+rand];
                kong.setVisible(true);
                for(var i=1;i<=6;i++){
                    if(i!=rand){
                        me.ui['kong'+i].setVisible(false);
                    }
                }



                var dh = flax.assetsManager.createDisplay(resGameMove.dh, "dh", {
                });

                dh.fps = 20;
                dh.play();

                dh.x = kong.width/2-10;
                dh.y = kong.height+42;

                dh.setScaleX((kong.width+120)/dh.width);
                kong.addChild(dh);
            }

            Getkong();
            me.touchListener = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesBegan : function (touches,event) {
                    var touch = touches[0];
                    var touchLocation = touch.getLocation();
                    pBegin = touchLocation;
                },
                onTouchesMoved:function(touches,event){
                    var touch = touches[0];
                    var touchLocation = touch.getLocation();

                        var streak = event.getCurrentTarget()._streak;
                        streak.x = touchLocation.x;
                        streak.y = touchLocation.y;

                    //痕迹


                    if(flax.ifTouched(me.ui['zhu1'],touchLocation))
                    {

                        cc.MySprite.createFlash(me.ui,resGameMove.flash,pBegin,touchLocation);
                        if(!me.isCrash)return;

                        me.ui['zhu1'].moveBy(0.1,cc.p(-20,0)).reverse().run();

                        me.isCrash = false;
                        GV.UI.tip_NB.show(LABLE.HHOVE);

                        var getzhusize = Math.abs(me.ui['zhu1'].height-touchLocation.y);

                        var sprite = new cc.Sprite(resGameMove.zhuzi);
                        sprite.setPosition(cc.p(me.ui['zhu1'].x,me.ui['zhu1'].y));
                        sprite.setScaleY(getzhusize/sprite.getContentSize().height);
                        sprite.setScaleX(38/sprite.getContentSize().width);
                        sprite.setAnchorPoint(cc.p(0.5, 1));
                        me.ui.addChild(sprite,50);

                        sprite.moveTo(0.5, cc.p(kong.x,kong.y))
                         .then(function () {
                            this.setAnchorPoint(cc.p(0.5, 0.5));
                        },sprite)
                        .rotateTo(0.1,90)
                        .then(function () {

                            function windh() {
                                var dh = flax.assetsManager.createDisplay(resGameMove.windh, "cgdh", {
                                });

                                dh.fps = 20;
                                dh.play();

                                dh.x = kong.width/2-10;
                                dh.y = kong.height+42;

                                dh.setScaleX((kong.width+120)/dh.width);
                                kong.addChild(dh,70);
                            }

                            var getWidth = kong.getBoundingBox().width-this.getBoundingBox().width;
                            if(getWidth>=data[rand].min&&getWidth<=data[rand].max){
                                this.blink(1,3).then(function () {
                                    GV.UI.tip_NB.show(GN.Str.stringFormat(LABLE.WIN,100));
                                    me.Score+=100;
                                    me.ui['fenshu'].setString(me.Score);
                                }).run();

                                windh();
                            }else{
                                this.blink(1,3).then(function () {
                                    GV.UI.tip_NB.show(GN.Str.stringFormat(LABLE.COME,me.he));
                                }).run();
                            }

                            if(me.he>=1){
                                this.delay(2).then(function () {

                                    me.he--;
                                    GV.UI.tip_NB.show(GN.Str.stringFormat(LABLE.HH,me.he));

                                }).delay(3).then(function () {
                                    me.isCrash = true;
                                    this.removeFromParent();
                                    kong.removeAllChildren();
                                    kaishi.removeFromParent();
                                    kong.setVisible(false);
                                    Getkong();
                                },this).run();
                            }else{
                                this.delay(5).then(function () {
                                    cc.eventManager.removeAllListeners();
                                    GV.UI['Over'].show();
                                    GV.UI['Over'].ui.setLocalZOrder(100);

                                }).run();
                            }


                        },sprite).run();

                    }
                }
            });

            cc.eventManager.addListener(me.touchListener,me.ui);
            //me.BothScrollview();
        }
         ,BothScrollview:function()
            {
                var me = this;
               var node = ccs.load(resGameMove.zhu).node;
                node.y+=300;
                node.x+=30;
                node.find('zhu').addCCSEventListener(me.sliderStateChange);
                me.ui.addChild(node,10);
            }
         ,sliderStateChange:function(sender,type){

            switch(type){
                case ccui.Slider.EVENT_PERCENT_CHANGED:
                    //cc.log("musicSlider percent : " + sender.getPercent());
                    break;
                default:
                    break;
            }
        }
        ,close: function(){
            this.pBegin = 255;
            this.isCrash = true;
            this.Score = 0;
            this.he = 17;
        }
    });

    GM.UIMage.BindUIByID(ID,new fun(resGameMove.gameMove,ID,BC.CUIType.FL));
})();
