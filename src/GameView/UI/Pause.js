/**
 * Created by jorbeen on 2017/8/30.
 */
(function(){
    var ID = 'Pause';

    var fun = GM.UIMage.UIBase.extend({
        ctor: function(json,id,type){
            this._super(json,id,type);
        },
        show : function(){
            this._super(this.showed);
        },
        showed : function() {
            var me = this;
            me.ui['sy_btn'].touch(BC.CUIType.FL,function (touch,event) {
                flax.replaceScene("GameBegin");
            },me);

            me.ui['jx_btn'].touch(BC.CUIType.FL,function (touch,event) {
                me.remove();
                cc.eventManager.addListener(GV.UI['GameMove'].touchListener,GV.UI['GameMove'].ui);
            },me);


        }
        ,close: function(){

        }
    });

    GM.UIMage.BindUIByID(ID,new fun(resGameMove.zanting,ID,BC.CUIType.FL));
})();
