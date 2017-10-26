/**
 * Created by QiaoBin on 2017/9/9.
 */
var GameMoveScene = GM.SceneMage.SceneBase.extend({
    onEnter: function () {
        this._super();

        GV.UI['GameMove'].show();


    },
    onExit:function() {
    }
});