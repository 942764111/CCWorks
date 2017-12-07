/**
 * Created by jorbeen on 2017/8/30.
 */
(function(){
    var ID = 'hall';

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

            me.initBindinUIButton();
        }
        ,initBindinUIButton : function(){
            var me  = this;

            function _ChangCallBack(selected){
                switch(selected.name){
                    case "myc_btn":

                        break;
                    case "cyc_btn":

                        break;
                    case "tyc_btn":

                        break;
                }
            }
            function _GameTypeCallBack(selected){
                switch(selected.name){
                    case "pj_btn":
                        me.ui["pj"].setSource(reshall.hall, "pj");
                        me.ui["pj"]["GType"] = "pj";
                        break;
                    case "nn_btn":
                        me.ui["pj"].setSource(reshall.hall, "nn");
                        me.ui["pj"]["GType"] = "nn";
                        break;
                    case "sg_btn":
                        me.ui["pj"].setSource(reshall.hall, "sg");
                        me.ui["pj"]["GType"] = "sg";
                        break;
                }
            }

            //Bind Button
            var group = new flax.ButtonGroup();
            group.addButton(me.ui["chang"]['myc_btn'], me.ui["chang"]['cyc_btn'], me.ui["chang"]['tyc_btn']);
            group.onSelected.add(_ChangCallBack,me);
            me.ui["chang"]['myc_btn'].selected = true;

            var group2 = new flax.ButtonGroup();
            group2.addButton(me.ui["GameType"]['pj_btn'], me.ui["GameType"]['nn_btn'], me.ui["GameType"]['sg_btn']);
            group2.onSelected.add(_GameTypeCallBack,me);
            me.ui["GameType"]['pj_btn'].selected = true;

            me.ui["pj"].touch(BC.CUIType.FL,function(){
                var GType = this["GType"]||"pj";
                switch(GType){
                    case "pj":
                        GM.SceneMage.replaceScene("RacingScene");
                        break;
                    case "nn":
                        break;
                    case "sg":
                        GM.SceneMage.replaceScene("SubmarineScene");
                        break;
                }
            })
        }
        ,close: function(){

        }
    });

    GM.UIMage.BindUIByID(ID,new fun(reshall.hall,ID,BC.CUIType.FL));
})();
