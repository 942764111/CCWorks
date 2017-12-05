
var  resLogin = {
    login:"res/login.plist",
    login_png:"res/login.png"
};
var reshall = {
    hall:"res/hall.plist",
    hall_png:"res/hall.png"
}
var Racinghall = {
    Racing:"res/Racing.plist",
    Racing_png:"res/Racing.png"
}

var res_Login = [];
var res_hall = [];
var res_Racing = [];

for(var obj in resLogin){
    res_Login.push(resLogin[obj]);
}

for(var obj in reshall){
    res_hall.push(reshall[obj]);
}

for(var obj in Racinghall){
    res_Racing.push(Racinghall[obj]);
}



