/**
 * Created by jorbeen on 2017/8/30.
 */
(function(){
    var ID = 'Submarine';

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
            me.GameControl();

        }
        ,GameControl : function (state) {
            var me = this;
            switch (state||'0'){
                case GC.GAME_INIT:
                    me.init();
                    break;
                case GC.GAME_RUN:
                    me.runGame();
                    break;
                case GC.GAME_PASS:
                    break;
                case GC.GAME_OVER:
                    break;
                default:
                    me.init();
                    me.runGame();
                    break
            }
        }
        ,init : function(type){
            var me = this,
                group,
                uidown = me.ui["down"],
                uiUser = me.ui["user"],
                uiTop = me.ui["top"],
                uiTrack = me.ui["track"],
                uiDesktop = me.ui["desktop"];
            //初始化UI按钮
            function initBindinUIButton() {
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
                        if(!me._Vessel._SetFramesEnabled) {
                            GV.UI.tip_NB.show(LABLE.KJZ);
                            return;
                        }
                        frame = this;

                        test = me._Vessel._GetPresentSTAKEBtn.parent.convertToWorldSpace(me._Vessel._GetPresentSTAKEBtn);
                        state = me.createOneflaxSp("stake_"+me._Vessel._GetPresentSTAKE,{
                            x:test.x,
                            y:test.y
                        });
                        frameToworldPos = frame["img"].parent.convertToWorldSpace(frame["img"]);

                        var rand_x = GN.Num.randomNumber((frameToworldPos.x-frame["img"].width/2)+30,(frameToworldPos.x+frame["img"].width/2)-30)
                        var rand_y = GN.Num.randomNumber((frameToworldPos.y-frame["img"].height/2)+30,(frameToworldPos.y+frame["img"].height/2)-30)
                        state.runAction(cc.moveTo(0.5,rand_x,rand_y))
                    }
                    for(var i=0;i<5;i++){
                        uiDesktop["frame_"+(i+1)].touch(BC.CUIType.FL,frameCallBack)
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
                //下层
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
            //初始化UI元素
            function initUIElement() {
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
                        frame["key"].setSource(Submarine.Submarine,"index"+i);
                        frame["sort"].setSource(Submarine.Submarine,"sort"+i);
                        uiDesktop["frame_"+i+"gold"].text = LABLE.DATETEST;
                        frame["mjpos_1"].setVisible(false);
                        frame["mjpos_2"].setVisible(false);
                        frame["sort"].setLocalZOrder(10);
                    }
                }
                function _initTrackElement(){
                    me.ui["time"].text = GN.Str.stringFormat(LABLE.S,me._Vessel._GetSTAKETime);
                    uiTrack["time"]["txt"].text = GN.Str.stringFormat(LABLE.S,me._Vessel._GetSTAKETime);
               //call
                    for(var i=0;i<10;i++){
                        me._Vessel._GetCalls.push(uiTrack["car_"+(i+1)])
                    }

                    me.ui["tarkmap1"].play();
                    me.ui["tarkmap2"].play();
                    me.ui["tarkmap3"].play();
                }
                function _initUserElement(){

                }
                function _initTopElement(){
                    for(var i=0;i<10;i++){
                        uiTop["ball"]["index_"+(i+1)]["meid"] = i;
                        uiTop["ball"]["index_"+(i+1)]["val"] = (i+1);
                        me._Vessel._GetBalls.push(uiTop["ball"]["index_"+(i+1)])
                    }
                }

                _initDownElement();
                _initDesktopElement();
                _initUserElement();
                _initTopElement();
                _initTrackElement();
            }
            function initVessel() {
                me._Vessel = {
                    _GetPresentSTAKE : "",
                    _GetSTAKEBtns : [],//押注按钮
                    _GetPresentSTAKEBtn : null,//获取当前
                    _GetSTAKETime : 30,//押注时间
                    _GetOpeningTime : 15,//等待开奖时间
                    _SetFramesEnabled : true,//设置桌面是否可以押注
                    _GetBalls : [],//获取top所有得球
                    _GetCalls : []//获取所有得车
                }
            }
            switch(type){
                case "Vessel":
                    initVessel();
                    break;
                case "UIButton":
                    initBindinUIButton();
                    break;
                case "UIElement":
                    initUIElement();
                    break;
                default:
                    initVessel();
                    initBindinUIButton();
                    initUIElement();
                    break;
            }
        }
        ,runGame : function () {
            var me = this
                , uiTop = me.ui["top"]
                ,uiDesktop = me.ui["desktop"]
                ,uiTrack = me.ui["track"];
            //封盘等待开奖
            function OpeningTimeCallBack() {
                if(me._Vessel._GetOpeningTime<=0){
                    me.ui["time"].setVisible(false);
                    me.ui.unschedule(OpeningTimeCallBack);

                    var CallTopos,isScrollingCarMap = false,index= 0,maxindex = 6,runtime = 2,sortindex=3;
                    function ScrollingCarMap(){
                        if(isScrollingCarMap)return;
                        isScrollingCarMap = true;
                        var sbg = new flax.ScrollingBG(me.ui["tarkmap1"]);
                        //Following bgs is optional
                        //下面添加的更多背景是可选的
                        for(var i=0;i<20;i++){
                            sbg.addSource(Submarine.Submarine, "tarkmap2");
                        }
                        sbg.addSource(Submarine.Submarine, "tarkmap3");
                        sbg.startXScroll(-600,false);

                        function _onScrolledOver(){
                            GN.Log("_onScrolledOver");
                            me.ui.unschedule(call);
                            var obj,runtime = 0;
                            for(var i=0;i<me._Vessel._GetBalls.length;i++){
                                obj = me._Vessel._GetCalls[me._Vessel._GetBalls[i]["meid"]];
                                obj.stopAllActions();
                                obj.play();
                                obj.autoStopWhenOver = true;
                                runtime = i+0.7>2?2:i+0.7;
                                obj.runAction(cc.moveTo(runtime,(cc.winSize.width-obj.width)+40,obj.y));
                            }

                            me.ui.scheduleOnce(function(){
                                var index= 0,Mahjong,ToworldPos,frameindex = 1;
                                function createMahjong(){
                                    if(index>8){
                                        me.ui.unschedule(createMahjong)
                                        me.ui.scheduleOnce(function () {
                                            GV.UI["close"].show();
                                        },1)
                                        return;
                                    }
                                    var isCallFunc = false,Ballval;
                                    for(var i=0;i<2;i++){
                                        Ballval = me._Vessel._GetBalls[index+i]["val"];
                                        Mahjong = me.createOneflaxSp("mj_"+Ballval);
                                        Mahjong.x  = -100+i*100;
                                        Mahjong.y  = cc.winSize.height/2+250;
                                        ToworldPos = uiDesktop["frame_"+frameindex]["mjpos_"+(i+1)].parent.convertToWorldSpace(uiDesktop["frame_"+frameindex]["mjpos_"+(i+1)]);
                                        Mahjong.runAction(cc.sequence(cc.moveBy(0.5,cc.winSize.width/2+100,0),
                                            cc.delayTime(1.5),
                                            cc.spawn(
                                                cc.moveTo(1,ToworldPos.x,ToworldPos.y),
                                                cc.scaleTo(1,0.5,0.5)
                                            ),
                                            new cc.CallFunc(function () {
                                                if(isCallFunc)return;
                                                var getval = me._Vessel._GetBalls[index+0]["val"]+me._Vessel._GetBalls[index+1]["val"]
                                                uiDesktop["frame_"+frameindex]["ds"].text = GN.Str.stringFormat(LABLE.DS,getval);
                                                index+=2;
                                                frameindex+=1;
                                                isCallFunc = true;
                                                me.ui.scheduleOnce(function () {
                                                    createMahjong();
                                                },1)
                                            },Mahjong)))
                                    }
                                }
                                createMahjong();
                            },1.5)
                        }
                        sbg.onScrolledOver.add(_onScrolledOver, me);
                    }
                    function call() {
                        index+=1;
                        sortindex = 3;
                        ScrollingCarMap();
                        function sortBall() {
                            var sort = GN.Arr.upsetArr(me._Vessel._GetBalls);
                            for(var i=0;i<sort.length;i++){
                                sort[i]["mepos"] = sort[i].getPosition();
                                sort[i].setPosition(uiTop["ball"]["pos_"+(i+1)].getPosition());
                                runCall(me._Vessel._GetCalls[sort[i]["meid"]]);
                            }
                            GN.Log("===================================");
                            function runCall(obj) {
                                obj.stop();
                                if(sortindex>0){
                                   // GN.Log(obj["name"]);
                                    runtime = GN.Num.randomNumber(0.7,1.5);
                                    if(index<maxindex/2){
                                        CallTopos = 200+(50*sortindex);
                                    }else{
                                        CallTopos = 400+(50*sortindex);
                                    }
                                    obj.play();
                                }else{
                                    runtime = 2;
                                    if(index<maxindex/2){
                                        CallTopos = GN.Num.randomNumber(100,200);
                                    }else{
                                        CallTopos = GN.Num.randomNumber(200,400);
                                    }
                                }
                                obj.stopAllActions();
                                obj.runAction(cc.moveTo(runtime,CallTopos,obj.y));
                                sortindex-=1;
                            }
                        }
                        sortBall();
                    }
                    me.ui.schedule(call,3);
                }
                me.ui["time"].text = GN.Str.stringFormat(LABLE.DDKJ,me._Vessel._GetOpeningTime);
                me._Vessel._GetOpeningTime-=1;
            }
            //投注时间
            function STAKETimeCallBack() {
                if(me._Vessel._GetSTAKETime<=0){
                    uiTrack["time"].setVisible(false);
                    me.ui["time"].fontSize=80;
                    me._Vessel._SetFramesEnabled = false;
                    me.ui.unschedule(STAKETimeCallBack)
                    me.ui.schedule(OpeningTimeCallBack,1)
                }else{
                    me.ui["time"].text =  GN.Str.stringFormat(LABLE.S,me._Vessel._GetSTAKETime);
                    uiTrack["time"]["txt"].text =  GN.Str.stringFormat(LABLE.S,me._Vessel._GetSTAKETime);
                    me._Vessel._GetSTAKETime-=1;
                }

            }
            me.ui.schedule(STAKETimeCallBack,1)
        }
        //tools
        ,createOneflaxSp : function (assetID,property) {
            var me = this;
            var ui = flax.assetsManager.createDisplay(Submarine.Submarine, assetID,property);
            me.ui.addChild(ui,5)
            return ui;
        }
        ,close: function(){

        }
    });

    GM.UIMage.BindUIByID(ID,new fun(Submarine.Submarine,ID,BC.CUIType.FL));
})();
