

var  resGameBegin = {
    GameState : 'res/gamePopStars.plist',
    GameState_png : 'res/gamePopStars.png',
    anniu : 'res/anniu.plist',
    anniu_png : 'res/anniu.png',
    bbxz : 'res/bbxz.plist',
    bbxz_png : 'res/bbxz.png',
    guanyu : 'res/guanyu.plist',
    guanyu_png : 'res/guanyu.png',
    IMG:'res/IMG.plist',
    IMG_png:'res/IMG.png',
    flash : 'res/flash.png'
}

var  resGameMove = {
    gameMove : 'res/gameMove.plist',
    gameMove_png : 'res/gameMove.png',
    zanting : 'res/zanting.plist',
    zanting_png : 'res/zanting.png',
    zhu : 'res/zhu.ExportJson',
    DemoLogin0 : 'res/DemoLogin0.png',
    DemoLogin0_png : 'res/DemoLogin0.plist',
    flash : 'res/flash.png',
    zhuzi : 'res/gameMove/zhuzi.png',
    dh : 'res/zhudh.plist',
    dh_png : 'res/zhudh.png',
    windh : 'res/chenggong.plist',
    windh_png : 'res/chenggong.png',
    kaishi :'res/kaishi.plist',
    kaishi_png :'res/kaishi.png',
    Over_png :'res/Over.png',
    Over :'res/Over.plist'

};

var res_GameBegin = [];
var res_GameMove = [];

for(var obj in resGameBegin){
    res_GameBegin.push(resGameBegin[obj]);
}

for(var move in resGameMove){
    res_GameMove.push(resGameMove[move]);
}



