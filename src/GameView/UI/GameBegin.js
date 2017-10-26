/**
 * Created by jorbeen on 2017/8/30.
 */
(function(){
    var ID = 'GameBegin';

    var fun = GM.UIMage.UIBase.extend({
        ctor: function(json,id,type){
            this._super(json,id,type);
        },
        show : function(){
            this._super(this.showed);
        },
        showed : function() {
            var me = this;



            var sprite = GN.ccsSprite('@HelloWorld',{
                x:cc.winSize.width/2,
                y:cc.winSize.height/2,
                FontSize:50
            });
            this.ui.addChild(sprite,10);

            var dou = GN.ccsSprite('dou.png',{
                x:cc.winSize.width/2,
                y:cc.winSize.height/2
            });
            this.ui.addChild(dou,10);


            var bbxz = flax.assetsManager.createDisplay(resGameBegin.bbxz, "layer", {
                x: cc.winSize.width/2,
                y: cc.winSize.height/2+150
            });
            bbxz.autoStopWhenOver = true;
            bbxz.fps = 20;
            bbxz.play();
            me.ui.addChild(bbxz);


            var btn = flax.assetsManager.createDisplay(resGameBegin.anniu, "begin_btn", {
                x: cc.winSize.width/2,
                y: cc.winSize.height/2-280
            });
            me.ui.addChild(btn);

            btn.play();
            btn.fps = 10;
            btn.touch(BC.CUIType.FL,function (touch,event) {
                GM.SceneMage.replaceScene("GameMove");
            },me);

            me.ui['gy_btn'].touch(BC.CUIType.FL,function (touch,event) {
                GV.UI['guanyu'].show();
            },me);

        }
        ,close: function(){

        }
    });

    GM.UIMage.BindUIByID(ID,new fun(resGameBegin.GameState,ID,BC.CUIType.FL));
})();
