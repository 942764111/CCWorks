/**
 * Created by QiaoBin on 2017/9/9.
 */
var GameMoveScene = GM.SceneMage.SceneBase.extend({
    onEnter: function () {
        this._super();

     //   GV.UI['kernel'].show();

        var map = GN.initTileMap(41,41,6,6);
        map.x = cc.winSize.width/2;
        map.y = cc.winSize.height/2;
        this.addChild(map)
    },
    onExit:function() {
    }
});