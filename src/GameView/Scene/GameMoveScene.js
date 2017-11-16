
var GameMoveScene = GM.SceneMage.SceneBase.extend({
        onEnter: function () {
            this._super();

            var cache = cc.spriteFrameCache;
            cache.addSpriteFrames(resGameBegin.img,resGameBegin.img_png);

            GV.UI['GameMove'].show();
        }
        ,onExit:function() {
        }
})