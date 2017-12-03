
var  resGameBegin = {
}
var resanimations = {
    hero1 : "res/hero1.plist",
    hero1_png : "res/hero1.png",
    hero2 : "res/hero2.plist",
    hero2_png : "res/hero2.png",
    hero3 : "res/hero3.plist",
    hero3_png : "res/hero3.png"
}
var  resGameMove = {
    GameMove : 'res/GameMove.plist',
    GameMove_png : 'res/GameMove.png'
};

var res_GameBegin = [];
var res_GameMove = [];

for(var obj in resGameBegin){
    res_GameBegin.push(resGameBegin[obj]);
}

for(var move in resGameMove){
    res_GameMove.push(resGameMove[move]);
}
for(var animations in resanimations){
    res_GameMove.push(resanimations[animations]);
}



