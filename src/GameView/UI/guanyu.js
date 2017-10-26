/**
 * Created by jorbeen on 2017/8/30.
 */
(function(){
    var ID = 'guanyu';

    var fun = GM.UIMage.UIBase.extend({
        ctor: function(json,id,type){
            this._super(json,id,type);
        },
        show : function(){
            this._super(this.showed);
        },
        showed : function() {
            var me = this;

            me.ui['esc_btn'].touch(BC.CUIType.FL,function (touch,event) {
                me.remove();
            },me);

        }
        ,close: function(){

        }
    });

    GM.UIMage.BindUIByID(ID,new fun(resGameBegin.guanyu,ID,BC.CUIType.FL));
})();
