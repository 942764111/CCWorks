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

            var sprite = GN.ccsSprite('@HelloWorld',{
                x:cc.winSize.width/2,
                y:cc.winSize.height/2,
                FontSize:50
            });
            this.ui.addChild(sprite,10);

            var dou = GN.ccsSprite('res/GameMove/dou.png',{
                x:cc.winSize.width/2,
                y:cc.winSize.height/2
            });
            this.ui.addChild(dou,10);

           // me.GameControl();
        }
        ,GameControl : function (state) {
            var me = this;
            switch (state||0){
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
                        _TileElements : [],
                        _MapLables : {},
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
                    var child = me.ui._children,childName = '',
                        vesselchildren,vesselobj;
                    for(var i=0;i<child.length;i++){
                        //addToTileMap
                        childName = child[i]['name']||'';
                        function pushTileElements(obj) {
                            var obj = obj;
                            var setpos = me._Vessel['_TileMap'].getTileIndex(obj);
                            me._Vessel['_TileMap'].snapToTile(obj,setpos.x,setpos.y,true);

                            function pushElements(Element) {
                                if(!GN.Str.countStr(Element['name'],'index_')||GN.Str.countStr(Element['name'],'_col'))return;
                                Element['isCollision'] = false;
                                Element['Tilepos'] = setpos;
                                Element['isvessel'] = GN.Str.countStr(Element.parent['name']||'','vessel');
                                Element['Type'] = GN.Str.SubStr(3,Element['name'],'t_',1);
                                Element['Label'] = GN.Str.SubStr(3,Element['name'],'t_'+Element['Type']+'_index_');
                                (function(){
                                    if(Element['Label']==Element['name']){
                                        GN.Log(Element['name']+'==Label Not Find')
                                    }
                                    if(Element['Type']==Element['name']){
                                        GN.Log(Element['name']+'==Type Not Find')
                                    }
                                })()


                                me._Vessel._MapLables[Element['Type']] = {};
                                me._Vessel._MapLables[Element['Type']]['iswin'] = false;
                                me._Vessel._MapLables[Element['Type']]['element'] = {};

                                me._Vessel['_TileElements'].push(Element)
                            }

                            if(obj instanceof flax.MovieClip){
                                var children = obj._children;
                                for(var i=0;i<children.length;i++){
                                    pushElements(children[i]);
                                }
                            }else{
                                pushElements(obj);
                            }

                        }
                        if(GN.Str.countStr(childName,'index_')){
                            pushTileElements(child[i]);
                        }else if(GN.Str.countStr(childName,'vessel')){
                            pushTileElements(child[i]);
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
                    ,MapLables =  me._Vessel['_MapLables']//地图上每个对象得索引标签
                    ,TouchObjtarget = null

            function BindElementTileEvent() {

                function CallBake(touch,event,target) {
                    var actionobj = target['isvessel']?target.parent:target;
                    TouchObjtarget = target;
                    actionobj.setMouseEnabled(false);
                    actionobj.rotateBy(0.2,90).then(function () {
                        var self = this;
                        function CallBack() {
                            var Tiles = null;
                            function setMapLables() {
                                //采用外观模式   获取四周可匹配的Tile
                                //return arr[]
                                function GetRoundTrueTiles() {
                                    var all = null;
                                    //采用适配器模式   获得周围的Tile对象
                                    function getRoundTiles(TileObj) {
                                        var obj = TileObj,pos = obj['Tilepos']

                                        if(obj){
                                            GN.Log(TileMap.getObjects(pos.x,pos.y));
                                        }
                                        return [
                                            TileMap.getObjects(pos.x-1,pos.y)[0]||null,
                                            TileMap.getObjects(pos.x+1,pos.y)[0]||null,
                                            TileMap.getObjects(pos.x,pos.y-1)[0]||null,
                                            TileMap.getObjects(pos.x,pos.y+1)[0]||null
                                        ];
                                    }

                                    //add   Collide  Sptite
                                    all = getRoundTiles(self);
                                    var RoundTile,returnAll=[],Mapelement = null;
                                    for(var i=0;i<all.length;i++){
                                        RoundTile = all[i];
                                        if(RoundTile&&GN.collide(self,RoundTile)){
                                            if(RoundTile instanceof flax.MovieClip){
                                                var child = RoundTile._children,childSubName;
                                                for(var j=0;j<child.length;j++){
                                                    childSubName = child[j]['name'].substring(0,child[j]['name'].lastIndexOf('_col'));
                                                    if(RoundTile&&
                                                        GN.Str.countStr(child[j]['name'],'_col')&&
                                                        RoundTile[childSubName]['Type']== self['Type']&&
                                                        flax.ifCollide(self,child[j])) {
                                                            returnAll.push(RoundTile[childSubName]);
                                                    }
                                                }
                                            }else{
                                                returnAll.push(RoundTile);
                                            }
                                        }else if(RoundTile&&self['Type']==RoundTile['Type']&&MapLables[RoundTile['Type']]){
                                            Mapelement = MapLables[RoundTile['Type']]['element'];
                                            for(var a in Mapelement){
                                                    if(a.toString()==RoundTile['Label']&&Mapelement[a]){
                                                        Mapelement[a] = null;
                                                    }
                                            }
                                        }
                                    }
                                    return returnAll;
                                }

                                //设置链接成功的TileObj 标签
                                function SetTileAndtargetLabel() {
                                    Tiles = GetRoundTrueTiles();

                                    var selfLabel = Number(self['Label']);
                                    if(Tiles.length>0){
                                        var obj,objLabel;
                                        for(var i=0;i<Tiles.length;i++){
                                            obj = Tiles[i];
                                            objLabel = Number(obj['Label']);
                                            if(selfLabel+1==objLabel||selfLabel-1==objLabel){
                                                MapLables[self['Type']]['element'][selfLabel] = self;
                                                MapLables[obj['Type']]['element'][objLabel] = obj;
                                            }
                                        }
                                    }else{
                                        MapLables[self['Type']]['element'][selfLabel] = null;
                                    }
                                }

                                SetTileAndtargetLabel();
                            }
                            function updateisWin() {
                                function isWin() {
                                    for(var i in MapLables){
                                        var is = false,
                                            arr = GN.Arr.passArray(MapLables[i]['element']);
                                        if(arr.length>=3){
                                            for(var a=0;a<arr.length;a++){
                                                if(arr[a]){
                                                    MapLables[i]['iswin'] = true;
                                                }else{
                                                    MapLables[i]['iswin'] = false;
                                                    break;
                                                }
                                            }
                                        }

                                        if(MapLables[i]['iswin']){
                                            is = true;
                                        }else{
                                            is = false;
                                            break;
                                        }
                                    }

                                    return is;
                                }
                                if(isWin()){
                                    GN.Log('成功')
                                }else{
                                    GN.Log('失败')
                                }
                            }

                            setMapLables();
                            updateisWin();
                        }

                        function RunCallBack() {
                            if(target['isvessel']){
                                for(var i=0;i<actionobj._children.length;i++){
                                    if(GN.Str.countStr(actionobj._children[i]['name'],'index_')&&!GN.Str.countStr(actionobj._children[i]['name'],'_col')){
                                        self = actionobj._children[i];
                                        CallBack();
                                    }
                                }
                            }else{
                                CallBack();
                            }
                        }
                        RunCallBack();

                        actionobj.setMouseEnabled(true);
                    },TouchObjtarget).run();
                }

                var obj;
                for(var i=0;i<Tiles.length;i++){
                    obj = Tiles[i];
                    if(obj){
                        obj.touch(BC.CUIType.FL,function (touch,event) {
                            CallBake(touch,event,this);
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
