/**
 * Created by jorbeen on 2017/8/29.
 */
var GC = GC||{};
GC.GAME_INIT = '1'
GC.GAME_RUN = '2'
GC.GAME_OVER ='4'
GC.GAME_PASS = '3'

GC["SPRITE_HERO"] = [
    {"id":"1","flaxres":"hero1"},
    {"id":"2","flaxres":"hero2"},
    {"id":"3","flaxres":"hero3"}
];


GC["GUIDE"]={
    "2":{"id":"2","title":"游戏开始后毽子会由一个小朋友踢出"},
    "3":{"id":"3","title":"毽子落在小朋友的身上时，他们会自动把毽子踢出去"},
    "4":{"id":"4","title":"毽子即将落在司马光身上时,您需要点击屏幕将毽子踢回"},
    "5":{"id":"5","title":"每踢到一个毽子增加一分，分数达到通关条件即可过关"},
    "6":{"id":"6","title":"游戏在倒计时结束后开始"},
};

GC["ACTION_TIME"] = 1.5;


Object.freeze(GC);