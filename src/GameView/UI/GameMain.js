/**
 * Created by jorbeen on 2017/8/29.
 */
(function(){
    var ID = 'GameMain';

    var fun = GM.UIMage.UIBase.extend({
        ctor: function(json,id,type){
            this._super(json,id,type);
        },
        show : function(){
            this._super(this.showed);
        },
        showed : function() {
            var me = this;
            me.ui.find('Layer.list.sc').touch(BC.CUIType.CC,function (sender,type) {
                if (type == ccui.Widget.TOUCH_ENDED){
                    //GN.Log("sc")
                    GM.SceneMage.replaceScene("HallScene");
                }
            },this);
            me.ui.find('Layer.list.yt').touch(BC.CUIType.CC,function (sender,type) {
                if (type == ccui.Widget.TOUCH_ENDED){
                  //  GN.Log("yt")
                    GM.SceneMage.replaceScene("HallScene");
                }
            },this);
            me.ui.find('Layer.list.ssc').touch(BC.CUIType.CC,function (sender,type) {
                if (type == ccui.Widget.TOUCH_ENDED){
                   // GV.UI.tip_NB.show("时时彩待开发。。");
                    GM.SceneMage.replaceScene("HallScene");
                }
            },this);
        }
        ,close: function(){

        }
    });

    GM.UIMage.BindUIByID(ID,new fun(resGameMain.GameMain,ID,BC.CUIType.CC));
})();
