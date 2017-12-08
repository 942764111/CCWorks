
var  resLogin = {
    login:"res/login.plist",
    login_png:"res/login.png"
};
var resGameMain= {
    GameMain : "res/GameMain.json"
}

var reshall = {
    hall:"res/hall.plist",
    hall_png:"res/hall.png",
    BJJS:"res/BJJS.json",
    BJJS_item:"res/BJJS_item.json"
}
var Racinghall = {
    Racing:"res/Racing.plist",
    Racing_png:"res/Racing.png"
}
var Submarine = {
    Submarine:"res/submarine.plist",
    Submarine_png:"res/submarine.png"
}


var res_Login = [];
var res_hall = [];
var res_Racing = [];
var res_Submarine = [];
var res_GameMain = [];

for(var obj in resLogin){
    res_Login.push(resLogin[obj]);
}

for(var obj in reshall){
    res_hall.push(reshall[obj]);
}

for(var obj in Racinghall){
    res_Racing.push(Racinghall[obj]);
}

for(var obj in Submarine){
    res_Submarine.push(Submarine[obj]);
}

for(var obj in resGameMain){
    res_GameMain.push(resGameMain[obj]);
}



