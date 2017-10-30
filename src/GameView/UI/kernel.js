/**
 * Created by jorbeen on 2017/8/30.
 */
(function(){
    var ID = 'kernel';

    var fun = GM.UIMage.UIBase.extend({
        ctor: function(json,id,type){
            this._super(json,id,type);
        },
        show : function(){
            this._super(this.showed);
        },
        showed : function() {
            var me = this;
        }
        ,close: function(){

        }
    });

    GM.UIMage.BindUIByID(ID,new fun(resGameBegin.GameState,ID,BC.CUIType.FL));
})();
