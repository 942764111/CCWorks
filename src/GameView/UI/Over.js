/**
 * Created by jorbeen on 2017/8/30.
 */
(function(){
    var ID = 'Over';

    var fun = GM.UIMage.UIBase.extend({
        ctor: function(json,id,type,flid){
            this._super(json,id,type,flid);
        },
        show : function(){
            this._super(this.showed);
        },
        showed : function() {
            var me = this;

            me.ui['sy_btn'].touch(BC.CUIType.FL,function (touch,event) {
                flax.replaceScene("GameBegin");
            },me);

        }
        ,close: function(){

        }
    });

    GM.UIMage.BindUIByID(ID,new fun(resGameMove.Over,ID,BC.CUIType.FL));
})();
