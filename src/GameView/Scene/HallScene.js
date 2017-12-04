
var HallScene = cc.Scene.extend({

    onEnter:function()
    {
        this._super();
        GV.UI["hall"].show();
    }
});