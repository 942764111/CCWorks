/**
 * Created by jorbeen on 2017/8/30.
 */
(function(){
    var ID = 'Login';

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
            me.init();
        }
        ,init : function(){
            var me = this;
            me.ui["DL"].setVisible(true);
            me.ui["SJDL"].setVisible(false);
            me.ui["ZC"].setVisible(false);

            me.ui.touch(BC.CUIType.FL,function(){
                GN.Log("q2314");
            })
        }
        ,close: function(){

        }
    });

    GM.UIMage.BindUIByID(ID,new fun(resLogin.login,ID,BC.CUIType.FL));
})();
