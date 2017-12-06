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
            me._Vessel = {
                _GetPresentSTAKE : "",
                _GetSTAKEBtns : [],
                _GetPresentSTAKEBtn : null,
                _GetSTAKETime : 30,
                _GetOpeningTime : 12,
            }
            me.initBindinUIButton();
            me.initUIElement();
            me.runGame();
        }
        ,initBindinUIButton : function(){
            var me = this,
                group,
                uidown = me.ui["down"],
                uiUser = me.ui["user"],
                uiTop = me.ui["top"],
                uiDesk = me.ui["desktop"];

            //上层
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
            //桌面
            function _BindDeskButton(){
                var state,frame,frameToworldPos,test;
                function frameCallBack() {
                    frame = this;

                    test = me._Vessel._GetPresentSTAKEBtn.parent.convertToWorldSpace(me._Vessel._GetPresentSTAKEBtn);
                    state = me.createOneflaxSp("stake_"+me._Vessel._GetPresentSTAKE,{
                        x:test.x,
                        y:test.y
                    });
                    state.setLocalZOrder(9);
                    frameToworldPos = frame["img"].parent.convertToWorldSpace(frame["img"]);
                    GN.Log(frameToworldPos);
                    var rand_x = GN.Num.randomNumber((frameToworldPos.x-frame["img"].width/2)+30,(frameToworldPos.x+frame["img"].width/2)-30)
                    var rand_y = GN.Num.randomNumber((frameToworldPos.y-frame["img"].height/2)+30,(frameToworldPos.y+frame["img"].height/2)-30)
                    state.runAction(cc.moveTo(0.5,rand_x,rand_y))
                }
                for(var i=0;i<5;i++){
                    uiDesk["frame_"+(i+1)].touch(BC.CUIType.FL,frameCallBack)
                }
            }
            //用户
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
            //层
            function _BindDownButton(){
                function _GoldBack(selected){
                    me._Vessel._GetPresentSTAKE = selected["meid"];
                    me._Vessel._GetPresentSTAKEBtn = selected;
                    GN.Log(selected["meid"]);
                }
                //充值
                uidown["cz_btn"].touch(BC.CUIType.FL,function () {
                    GV.UI.tip_NB.show('[充值]待开发。。');
                })


                //Bind Button
                group = new flax.ButtonGroup();
                var btnarr = [];
                for(var obj in GC.RACING_STAKE){
                    btnarr.push(uidown["btn_"+obj]);
                }
                group.addButton(btnarr);
                group.onSelected.add(_GoldBack,me);
                uidown["btn_"+GC.RACING_STAKE[GN.RACING_STAKE_INIT]["id"]].selected = true;

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
                for(var obj in GC.RACING_STAKE){
                    uidown["btn_"+obj]["meid"] = obj
                }
                me._Vessel._GetPresentSTAKE = GN.RACING_STAKE_INIT;
                me._Vessel._GetPresentSTAKEBtn =  uidown["btn_"+GN.RACING_STAKE_INIT];
            }
            function _initDesktopElement(){
                var frame;
                    for(var i= 1,len=5;i<=len;i++){
                        frame = uiDesktop["frame_"+i]
                        frame["key"].setSource(Racinghall.Racing,"index"+i);
                        frame["sort"].setSource(Racinghall.Racing,"sort"+i);
                        uiDesktop["frame_"+i+"gold"].text = 99999;
                        frame["sort"].setLocalZOrder(10);
                    }
            }
            function _initTrackElement(){
                me.ui["time"].text = GN.Str.stringFormat(LABLE.S,me._Vessel._GetSTAKETime);
                uiTrack["time"]["txt"].text = GN.Str.stringFormat(LABLE.S,me._Vessel._GetSTAKETime);
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
        ,runGame : function () {
            var me = this
                ,uiTrack = me.ui["track"];
            function OpeningTimeCallBack() {
                if(me._Vessel._GetOpeningTime<=0){
                    me.ui["time"].setVisible(false);
                    me.ui.unschedule(OpeningTimeCallBack)
                }
                me.ui["time"].text = GN.Str.stringFormat(LABLE.DDKJ,me._Vessel._GetOpeningTime);
                me._Vessel._GetOpeningTime-=1;
            }
            function STAKETimeCallBack() {
                if(me._Vessel._GetSTAKETime<=0){
                    uiTrack["time"].setVisible(false);
                    me.ui.unschedule(STAKETimeCallBack)
                    me.ui.schedule(OpeningTimeCallBack,1)
                }
                me.ui["time"].text =  GN.Str.stringFormat(LABLE.S,me._Vessel._GetSTAKETime);
                uiTrack["time"]["txt"].text =  GN.Str.stringFormat(LABLE.S,me._Vessel._GetSTAKETime);
                me._Vessel._GetSTAKETime-=1;
            }
            me.ui.schedule(STAKETimeCallBack,1)
        }
        ,createOneflaxSp : function (assetID,property) {
            var me = this;
            var ui = flax.assetsManager.createDisplay(Racinghall.Racing, assetID,property);
            me.ui.addChild(ui)
            return ui;
        }
        ,close: function(){

        }
    });

    GM.UIMage.BindUIByID(ID,new fun(Racinghall.Racing,ID,BC.CUIType.FL));
})();
