cc.game.onStart = function(){
    if(!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));
    // Pass true to enable retina display, disabled by default to improve performance
    var sys = cc.sys;



    // if(sys.os === sys.OS_IOS ||sys.os==sys.OS_ANDROID){
    // }else{
    //
    // }

    cc.view.enableRetina(true);
    cc.view.enableAutoFullScreen(false);
    cc.view.resizeWithBrowserSize(true);
    flax.init(cc.ResolutionPolicy.SHOW_ALL);

    cc.view.resizeWithBrowserSize(true);


    flax.registerScene("LoginScene", LoginScene, res_Login);
    flax.registerScene("HallScene", HallScene, res_hall);
    flax.replaceScene("HallScene");
};
cc.game.run();

