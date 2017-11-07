/**
 * Created by jorbeen on 2017/8/30.
 */
(function(){
    var ID = 'GameMove';

    var fun = GM.UIMage.UIBase.extend({
        ctor: function(json,id,type){
            this._super(json,id,type);
        },
        show : function(){
            this._super(this.showed);
        },
        showed : function() {
            var me = this;

            me.GameControl(1);
            me.ui.schedule(me.CreateEnemy,2);
        }
        ,GameControl : function (state) {
            var me = this;
            switch (state.toString()){
                case GC.GAME_INIT:
                    me.Gameinit();
                    break;
                case GC.GAME_RUN:
                    break;
                case GC.GAME_PASS:
                    break;
                case GC.GAME_OVER:
                    break;
                default:
                    me.Gameinit();
                    break
            }
        }
        ,Gameinit : function(type){
            var me = this;
            function variables() {

            }
            function initHero() {
                function addEvent() {
                    var pos;
                    function MoveCallBack(touch) {
                        pos = touch._point;
                        this.y = pos.y;
                    }
                    flax.inputManager.addListener(me.ui['Hero'],MoveCallBack,InputType.move,me.ui['Hero']);
                }
                addEvent();
            }
            function initEnemy() {
                
                var gold;
                var goldAll = [];

                function initGold() {
                    for(var i=0;i<20;i++){
                        gold = new me.CreateSprite(SPGold);
                        cc.pool.putInPool(gold);
                    }
                }
                initGold();
                for(var j=0;j<10;j++){
                    gold = me.CreateSprite(SPGold);
                    gold.x = cc.winSize.width/2;
                    gold.y = GN.Num.randomNumber(0,cc.winSize.height);
                    me.ui.addChild(gold)
                }
            }
            function Map() {

            }
            switch (type){
                case 'variables':break;
                case 'Hero':
                    initHero();
                    break;
                case 'Enemy':
                    initEnemy();
                    break;
                case 'Map':break;
                default :
                    variables();
                    Map();
                    initHero();
                    initEnemy();
                    break;
            }
        }
        ,CreateSprite : function(SpriteClass){
            if(cc.pool.hasObject(SpriteClass))   //判断缓冲池里 是否存在 Hero对象
            {
                GN.Log('取出');
                return cc.pool.getFromPool(SpriteClass);   // 从缓冲池里取出 Hero对象
            }
            else
            {
                GN.Log('新创建');
                return new SpriteClass();
            }
        }
        ,CreateEnemy : function () {
            cc.log('123');
        }
        ,init : function () {

        }
        ,close: function(){

        }
    });

    GM.UIMage.BindUIByID(ID,new fun(resGameMove.runGame,ID,BC.CUIType.FL));
})();
