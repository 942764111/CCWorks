/**
 * Created by jorbeen on 2017/8/30.
 */
(function(){
    var ID = 'GameOver';

    var fun = GM.UIMage.UIBase.extend({
        ctor: function(json,id,type){
            this._super(json,id,type);
        },
        show : function(){
            this._super(this.showed);
        },
        showed : function() {
            var me = this;

            me.ui['xyg_btn'].touch(BC.CUIType.FL,function (touch,event) {
                GN.GAME_PASS_INDEX+=1;
                GM.SceneMage.replaceScene("GameBegin");
            },me);
        }
        ,close: function(){

        }
    });

    GM.UIMage.BindUIByID(ID,new fun(resGameMove.GameOver,ID,BC.CUIType.FL));
})();
