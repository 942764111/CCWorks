
var  resGameBegin = {
}

var  resGameMove = {
    GameMove : 'res/GameMove.plist',
    GameMove_png : 'res/GameMove.png',
    physics:'res/gamePhysics.plist',
    physics_png:'res/gamePhysics.png'
};

var res_GameBegin = [];
var res_GameMove = [];

for(var obj in resGameBegin){
    res_GameBegin.push(resGameBegin[obj]);
}

for(var move in resGameMove){
    res_GameMove.push(resGameMove[move]);
}



