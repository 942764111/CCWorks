
var RacingScene = cc.Scene.extend({

    onEnter:function()
    {
        this._super();
        GV.UI["Racing"].show();
    }
});