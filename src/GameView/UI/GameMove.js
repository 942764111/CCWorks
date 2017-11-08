/**
 * Created by jorbeen on 2017/8/30.
 */
(function(){
    var ID = 'GameMove';

    var fun = GM.UIMage.UIBase.extend({
        _Vessel : null,//全局引用容器
        ctor: function(json,id,type){
            this._super(json,id,type);
        },
        show : function(){
            this._super(this.showed);
        },
        showed : function() {
            var me = this;

            me.GameControl();
        }
        ,GameControl : function (state) {
            var me = this;
            switch (state||0&&state.toString()){
                case GC.GAME_INIT:
                    me.init();
                    break;
                case GC.GAME_RUN:
                    me.RunGame();
                    break;
                case GC.GAME_PASS:
                    break;
                case GC.GAME_OVER:
                    break;
                default:
                    me.init();
                    me.RunGame();
                    break
            }
        }
        ,init : function(type){
            var me = this;
            function variables() {
                me._Vessel = {
                        _TileMap : null,
                        _TileElements : []
                }
            }
            function Map() {
                var map = GN.initTileMap(GC.MAP.TILE_WIDTH,
                    GC.MAP.TILE_HEIGHT,
                    GC.MAP.ROWS,
                    GC.MAP.COLS,null,1)
                map.x =cc.winSize.width/5
                map.y = cc.winSize.height/3;
                map.setAnchorPoint(cc.p(0,0));
                me.ui.addChild(map);
                me._Vessel['_TileMap'] = map;
                
                function bindElementToTileMap() {
                    var child = me.ui._children,childName = '';
                    for(var i=0;i<child.length;i++){
                        //addToTileMap
                        childName = child[i]['name']||'';
                        if(GN.Str.countStr(childName,'index_')){
                            var setpos = me._Vessel['_TileMap'].getTileIndex(child[i]);
                            me._Vessel['_TileMap'].snapToTile(child[i],setpos.x,setpos.y,true);
                            child[i]['isCollision'] = false;
                            child[i]['TileIndex'] = setpos;
                            me._Vessel['_TileElements'].push(child[i])
                        }
                    }
                }
                bindElementToTileMap();
            }
            switch (type){
                case 'variables':break;
                case 'Map':break;
                default :
                    variables();
                    Map();
                    break;
            }
        }
        ,RunGame : function () {
            var me = this
                    ,TileMap =  me._Vessel['_TileMap']
                    ,Tiles =  me._Vessel['_TileElements']
                    ,TouchObjtarget = null



            function BindElementTileEvent() {

                function CallBake(touch,event) {
                    TouchObjtarget = event['target']
                    var all = null;
                    TouchObjtarget.setMouseEnabled(false);

                    TouchObjtarget.rotateBy(0.2,90).then(function () {
                        function getRoundTile(TileObj) {
                            var obj = TileObj,pos = obj['TileIndex']
                            return [
                                TileMap.getObjects(pos.x-1,pos.y)[0]||null,
                                TileMap.getObjects(pos.x+1,pos.y)[0]||null,
                                TileMap.getObjects(pos.x,pos.y-1)[0]||null,
                                TileMap.getObjects(pos.x,pos.y+1)[0]||null
                            ];
                        }
                        all = getRoundTile(TouchObjtarget);

                        for(var i=0;i<all.length;i++){
                            if(all[i]&&GN.collide(TouchObjtarget,all[i])){
                                GN.Log(all[i]['name']);
                            }
                        }
                        TouchObjtarget.setMouseEnabled(true);
                    },TouchObjtarget).run();
                }

                var obj;
                for(var i=0;i<Tiles.length;i++){
                    obj = Tiles[i];
                    if(obj){
                        obj.touch(BC.CUIType.FL,function (touch,event) {
                            CallBake(touch,event);
                        },obj);
                    }
                }
            }

            BindElementTileEvent();
        }
        ,close: function(){

        }
    });

    GM.UIMage.BindUIByID(ID,new fun(resGameMove.runGame,ID,BC.CUIType.FL));
})();
