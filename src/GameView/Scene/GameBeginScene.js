
var GameBeginScene = GM.SceneMage.SceneBase.extend({
        onEnter: function () {
            this._super();

            Socket.getInstance().initNetwork();
             GV.UI['YXSM2'].show();

        },
        onExit:function() {
        }
})