
var  resGameBegin = {
    img : 'res/IMG.plist',
    img_png : 'res/IMG.png'
}

var  resGameMove = {
    img : 'res/IMG.plist',
    img_png : 'res/IMG.png',
    runGame : 'res/RunGame.plist',
    runGame_png : 'res/RunGame.png',
    GameOver : 'res/GameOver.plist',
    GameOver_png : 'res/GameOver.png',
    gold_png:'res/GameMove/gold.png',
    enemy_png:'res/GameMove/enemy.png',
    heart_png:'res/GameMove/heart.png'
};

var res_GameBegin = [];
var res_GameMove = [];

for(var obj in resGameBegin){
    res_GameBegin.push(resGameBegin[obj]);
}

for(var move in resGameMove){
    res_GameMove.push(resGameMove[move]);
}



