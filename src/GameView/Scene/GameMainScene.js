
var GameMainScene = cc.Scene.extend({

    onEnter:function()
    {
        this._super();
        GV.UI["GameMain"].show();
    }
});