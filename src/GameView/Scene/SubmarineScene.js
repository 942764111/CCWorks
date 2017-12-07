
var SubmarineScene = cc.Scene.extend({

    onEnter:function()
    {
        this._super();
        GV.UI["Submarine"].show();
    }
});