
var GameBeginScene = GM.SceneMage.SceneBase.extend({
        onEnter: function () {
            this._super();

            // var cache = cc.spriteFrameCache;
            // cache.addSpriteFrames(resGameBegin.IMG,resGameBegin.IMG_png);

            GV.UI['GameMove'].show();

        },
        onExit:function() {
        }
})