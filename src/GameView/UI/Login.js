/**
 * Created by jorbeen on 2017/8/30.
 */
(function(){
    var ID = 'Login';

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
            me.showMovieClip("LoginMain");
        }
        ,showMovieClip : function (MovieClipName) {
            var me = this
                ,_GetHero;
            _GetHero = function (MovieClipName) {
                var _getMovieClipName =  MovieClipName;
                var _MovieClipNameData =  [
                    {"id":"LoginMain","res":"DL"},
                    {"id":"PhoneLogin","res":"SJDL"},
                    {"id":"Register","res":"ZC"}
                    ];
                function _GetMovieClipHero() {
                    var i=0,arr = _MovieClipNameData,hero;
                    do{
                        if(arr[i]["id"]==_getMovieClipName){
                            hero = me.ui[arr[i]["res"]];
                            me.ui[arr[i]["res"]].setVisible(true);
                        }else{
                            me.ui[arr[i]["res"]].setVisible(false);
                        }
                        i++;
                    }while(i<arr.length)
                    return hero?hero:GN.ErrorLog("arr[i][\"id\"]==_getMovieClipName未匹配")
                }
                // 主页面： 微信登陆   手机登陆页面  注册页面
                function _LoginMain() {
                    var Hero = _GetMovieClipHero();
                    //Bind Button
                    //手机模式登陆
                    Hero["sjbtn"].touch(BC.CUIType.FL,function () {
                        GN.Log("sjbtn");
                        me.showMovieClip("PhoneLogin");
                    })
                    //微信
                    Hero["wxbtn"].touch(BC.CUIType.FL,function () {
                        GV.UI.tip_NB.show('[微信]待开发。。');
                        GN.Log("wxbtn");
                    })
                    //快速登陆
                    Hero["ksdlbtn"].touch(BC.CUIType.FL,function () {
                        GV.UI.tip_NB.show('[快速登陆]待开发。。');
                        GN.Log("ksdlbtn");
                    })
                    //账号注册
                    Hero["zczhbtn"].touch(BC.CUIType.FL,function () {
                        GN.Log("zczhbtn");
                        me.showMovieClip("Register");
                    })
                }
                //手机登陆
                function _PhoneLogin() {
                    var Hero = _GetMovieClipHero();
                    //Bind Button
                    //忘记密码
                    Hero["wjmmbtn"].touch(BC.CUIType.FL,function () {
                        GV.UI.tip_NB.show('[忘记密码]待开发。。');
                        me.showMovieClip("LoginMain");
                    })
                    //登陆
                    Hero["dlbtn"].touch(BC.CUIType.FL,function () {
                        GV.UI.tip_NB.show('[登陆]待开发。。');
                        me.showMovieClip("LoginMain");
                    })
                }
                //注册
                function _Register() {
                    var Hero = _GetMovieClipHero();
                    //Bind Button
                    //注册提交
                    Hero["zcbtn"].touch(BC.CUIType.FL,function () {
                        GV.UI.tip_NB.show('[提交]待开发。。');
                        me.showMovieClip("LoginMain");
                    })
                    //登陆
                    Hero["dlbtn"].touch(BC.CUIType.FL,function () {
                        me.showMovieClip("PhoneLogin");
                    })
                }

                return function () {
                    switch(MovieClipName){
                        case "LoginMain"://主页面
                            return _LoginMain();
                        case "PhoneLogin"://手机登陆
                            return _PhoneLogin();
                        case "Register"://注册页面
                            return _Register();
                    }
                }();
            }

            _GetHero(MovieClipName)
        }
        ,close: function(){

        }
    });

    GM.UIMage.BindUIByID(ID,new fun(resLogin.login,ID,BC.CUIType.FL));
})();
