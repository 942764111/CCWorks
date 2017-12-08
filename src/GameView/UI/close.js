/**
 * Created by jorbeen on 2017/8/29.
 */
(function(){
    var ID = 'close';

    var fun = GM.UIMage.UIBase.extend({
        ctor: function(json,id,type){
            this._super(json,id,type);
        },
        show : function(){
            this._super(this.showed);
        },
        showed : function() {
            var me = this;
            me.ui.find('Layer.bj.remove').touch(BC.CUIType.CC,function (sender,type) {
                if (type == ccui.Widget.TOUCH_ENDED){
                    me.remove();
                }
            },this);

            for(var i=0;i<10;i++){
                me.ui.find('Layer.bj.list').pushBackCustomItem(ccs.load(reshall.BJJS_item).node);
            }
        }
        ,close: function(){

        }
    });

    GM.UIMage.BindUIByID(ID,new fun(reshall.BJJS,ID,BC.CUIType.CC));
})();
