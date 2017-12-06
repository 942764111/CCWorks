/**
 * Created by jorbeen on 2017/8/30.
 */
(function(){
    var ID = 'Racing';

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
            me.initUIElement();
        }
        ,initBindinUIButton : function(){
            var me = this,
                group,
                uidown = me.ui["down"],
                uiUser = me.ui["user"],
                uiTop = me.ui["top"];


            function _BindTopButton(){
                //返回
                uiTop["back_btn"].touch(BC.CUIType.FL,function () {
                    GM.SceneMage.replaceScene("HallScene");
                })
                //结算
                uiTop["result_btn"].touch(BC.CUIType.FL,function () {
                    GV.UI.tip_NB.show('[结算]待开发。。');
                })
            }
            function _BindTrackButton(){

            }
            function _BindDeskButton(){

            }
            function _BindUserButton(){
                //客服
                uiUser["kf_btn"].touch(BC.CUIType.FL,function () {
                    GV.UI.tip_NB.show('[客服]待开发。。');
                })

                //参与人群
                uiUser["cyrq_btn"].touch(BC.CUIType.FL,function () {
                    GV.UI.tip_NB.show('[参与人群]待开发。。');
                })
            }
            function _BindDownButton(){
                function _GoldBack(selected){
                    GN.Log(selected['name']);
                }
                //充值
                uidown["cz_btn"].touch(BC.CUIType.FL,function () {
                    GV.UI.tip_NB.show('[充值]待开发。。');
                })


                //Bind Button
                group = new flax.ButtonGroup();
                var btnarr = [];
                for(var obj in GC.STAKE){
                    btnarr.push(uidown["btn_"+obj]);
                }
                group.addButton(btnarr);
                group.onSelected.add(_GoldBack,me);
                uidown["btn_"+GC.STAKE["10"]["id"]].selected = true;

            }

            _BindTopButton();
            _BindTrackButton();
            _BindDeskButton();
            _BindUserButton();
            _BindDownButton();
        }
        ,initUIElement : function(){
            var me = this,
                uidown = me.ui["down"],
                uiUser = me.ui["user"],
                uiTop = me.ui["top"],
                uiTrack = me.ui["track"],
                uiDesktop = me.ui["desktop"];
            function _initDownElement(){

            }
            function _initDesktopElement(){
                var frame;
                    for(var i= 1,len=5;i<=len;i++){
                        frame = uiDesktop["frame_"+i]
                        frame["key"].setSource(Racinghall.Racing,"index"+i);
                        frame["sort"].setSource(Racinghall.Racing,"sort"+i);
                    }
            }
            function _initTrackElement(){
            }
            function _initUserElement(){

            }
            function _initTopElement(){

            }

            _initDownElement();
            _initDesktopElement();
            _initUserElement();
            _initTopElement();
            _initTrackElement();
        }
        ,close: function(){

        }
    });

    GM.UIMage.BindUIByID(ID,new fun(Racinghall.Racing,ID,BC.CUIType.FL));
})();
