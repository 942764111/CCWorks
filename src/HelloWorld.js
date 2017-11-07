
var HelloWorldLayer = cc.Layer.extend({
    ctor: function () {
        //////////////////////////////
        // 1. super init first
        this._super();

    },
    onEnter: function () {
        this._super();

    },
    onExit: function () {
        this._super();
    }
});


var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});