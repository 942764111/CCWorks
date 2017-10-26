/**
 * Created by jorbeen on 2017/8/29.
 */


(function () {
    GM.SceneMage.replaceScene = function (sceneID) {
        GM.UIMage.closeAllFrame(true);
        flax.replaceScene(sceneID);
    };

    GM.SceneMage.GetScene = function () {
        GN.GetRunScene();
    };
    GM.SceneMage.SceneBase = cc.Scene.extend({
        
    })
})();
