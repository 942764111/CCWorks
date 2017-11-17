var SPGold = cc.Sprite.extend({
    ctor: function(){
        this._super(resGameMove.gold_png);
        this.initData();
    },

    initData: function(){
    },

    unuse: function(){
        this.retain();    //保存  防止被回收
        this.removeFromParent();
    },

    reuse: function(hp,mp){
        this.initData(hp,mp);
    }
});