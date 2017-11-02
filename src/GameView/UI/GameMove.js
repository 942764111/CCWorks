/**
 * Created by jorbeen on 2017/8/30.
 */
(function(){
    var ID = 'GameMove';

    var fun = GM.UIMage.UIBase.extend({
        _GameVessel : null,
        ctor: function(json,id,type){
            this._super(json,id,type);
        },
        show : function(){
            this._super(this.showed);
        },
        showed : function() {
            var me = this;
            me.SetGameController(1);
            me.SetGameController(2);
        }
        /**
         *  游戏控制器
         * @param state  1:初始化  2：开始   3：结束
         * @constructor
         */
        ,SetGameController : function (state) {
            var me = this;
            switch(state){
                case GC.GAME_STATE.INIT:
                    me.init();
                    break;
                case GC.GAME_STATE.STATE:
                    me.runGame();
                    break;
                case GC.GAME_STATE.OVER:
                    me.GameOver();
                    me.init('Variable');
                    me._GameVessel = null;
                    break;
            }
        }
        /**
         * 初始化 Type  : Variable  TileMap  UI
         * @param initType
         */
        ,init : function (initType) {
            var me = this;
            //初始化变量
            function initVariable() {
                me._GameVessel  = {
                    _getTileMap : null,
                    _isWin:false,//是否赢了
                    _touchPos:{},//记录触摸坐标
                    _GridTouchChildrenAll:[],//触摸中的格子子对象
                    _GridAll:[],//所有格子对象
                    _GridTouch:null//当前格子对象
                }

                if(GN.GAME_PASS_INDEX>GN.MAX_GAME_PASS_INDEX){
                    GN.GAME_PASS_INDEX = 1;
                }
            }
            //初始化TileMap
            function initTileMap() {
                me._GameVessel._getTileMap = GN.initTileMap(53,53,6,6,null,true);
                me._GameVessel._getTileMap.x+=33;
                me._GameVessel._getTileMap.y+=40;
                me.ui['map'].addChild( me._GameVessel._getTileMap);
            }
            //初始化游戏UI相关
            function initGameUIInfo() {
                if(GN.GAME_PASS_INDEX>GN.MAX_GAME_PASS_INDEX){
                    GN.GAME_PASS_INDEX = 1;
                }
                me.ui['scoreTxt0'].text = GN.GAME_PASS_INDEX;
            }
            //初始化Grid到地图中
            function initGameGridToTileMap() {
                var Grid = null,GridAll=me._GameVessel._GridAll;
                var data = GC.GAME_PASS[GN.GAME_PASS_INDEX];
                for(var lev = 1;lev<=GN.MAX_GAME_PASS_INDEX;lev++){
                    if(lev!=GN.GAME_PASS_INDEX){
                        me.ui['lev'+lev].setVisible(false);
                    }else{
                        me.ui['lev'+lev].setVisible(true);
                    }
                }

                for(var i=0;i<data.length;i++){
                    Grid = me.ui['lev'+GN.GAME_PASS_INDEX]['test'+data[i]['id']];
                    Grid.direction = data[i]['direction'];
                    Grid.posab = data[i]['pos'];
                    Grid.id = data[i]['id'];

                    function bindGridChildrenToMap() {
                        for(var j=0;j<Grid._children.length;j++){
                            var childindex = me._GameVessel._getTileMap.getTileIndex(Grid._children[j].parent.convertToWorldSpace(Grid._children[j]));
                            Grid._children[j]['isme'] = false;
                            me._GameVessel._getTileMap.snapToTile(Grid._children[j],childindex.x,childindex.y,true);
                        }
                    }

                    bindGridChildrenToMap();

                    GridAll.push(Grid);
                }
            }
            switch(initType){
                case 'Variable':
                    initVariable();
                    break;
                case 'TileMap':
                    initTileMap();
                    break;
                case 'UI':
                    initGameUIInfo();
                    break;
                case 'Grid':
                    initGameGridToTileMap();
                    break;
                default:
                    initVariable();
                    initTileMap();
                    initGameUIInfo();
                    initGameGridToTileMap();
                    break
            }
        }
        ,runGame : function () {
            var me = this
                ,GridAll = me._GameVessel._GridAll
                ,TouchGridChilds = me._GameVessel._GridTouchChildrenAll
                ,TouchGrid = me._GameVessel._GridTouch
                ,map = me._GameVessel._getTileMap
                ,touchpos = me._GameVessel._touchPos

            function bindGridEvent() {
                var obj;
                for (var i = 0; i < GridAll.length; i++) {
                    obj = GridAll[i];
                    flax.inputManager.addListener(obj,GridCallBacks('press'),InputType.press, obj);
                    flax.inputManager.addListener(obj,GridCallBacks('move'),InputType.move, obj);
                    flax.inputManager.addListener(obj,GridCallBacks('up'),InputType.up, obj);
                }
            }
            //判断是否能走
            function ismove() {
                var obj,bool=false;
                for(var i=0;i<TouchGridChilds.length;i++) {
                    obj = TouchGridChilds[i];
                    var childindex = map.getTileIndex(obj.parent.convertToWorldSpace(obj));
                    //↑
                    if(touchpos['move'].y>touchpos['begin'].y&&TouchGrid['direction']=='0'){
                        //是否有人
                        var isEmpty = map.isEmptyTile(childindex.x, childindex.y+1);
                        var getObject = map.getObjects(childindex.x, childindex.y+1);
                        var test = !isEmpty&&getObject.length>0&&!getObject[0]['isme']
                        if(test){
                            GN.Log('y++++'+bool);
                            bool = map.getTiledPosition(obj.parent.convertToWorldSpace(obj));
                            break;
                        }
                    }
                    //↓
                    else if(touchpos['move'].y<touchpos['begin'].y&&TouchGrid['direction']=='0'){
                        //是否有人
                        var isEmpty = map.isEmptyTile(childindex.x, childindex.y-1)
                        var getObject = map.getObjects(childindex.x, childindex.y-1);
                        var test = !isEmpty&&getObject.length>0&&!getObject[0]['isme']
                        if(test){
                            GN.Log('y-----'+bool);
                            bool = map.getTiledPosition(obj.parent.convertToWorldSpace(obj));
                            break;
                        }
                    }
                    //→
                    if(touchpos['move'].x>touchpos['begin'].x&&TouchGrid['direction']=='1'){

                        var isEmpty = map.isEmptyTile(childindex.x+1, childindex.y)
                        var getObject = map.getObjects(childindex.x+1, childindex.y);
                        var test = !isEmpty&&getObject.length>0&&!getObject[0]['isme']
                        if(test){
                            GN.Log('x++++'+bool);
                            bool = true;
                            break;
                        }
                    }
                    //←
                    else if(touchpos['move'].x<touchpos['begin'].x&&TouchGrid['direction']=='1') {
                        var isEmpty = map.isEmptyTile(childindex.x - 1, childindex.y)
                        var getObject = map.getObjects(childindex.x - 1, childindex.y);
                        var test = !isEmpty && getObject.length > 0 && !getObject[0]['isme']
                        if (test) {
                            GN.Log('x-----'+bool);
                            bool = true;
                            break;
                        }
                    }

                }
                return bool;
            }
            //检测越界 并设置在范围中
            function updateScope() {
                var obj = TouchGrid;
                if (obj['direction'] == '0') {
                    var gettileindex = map.getTileIndex(obj.parent.convertToWorldSpace(obj));
                    var miny = map.getTiledPosition(gettileindex.x,obj['posab']['min']);
                    var maxy = map.getTiledPosition(gettileindex.x,obj['posab']['max']);
                    //检测边界
                    if(obj.y <miny.y){
                        obj.y = miny.y;
                    }else if(obj.y >maxy.y){
                        obj.y = maxy.y;
                    }
                } else if (obj['direction'] == '1') {
                    var gettileindex = map.getTileIndex(obj.parent.convertToWorldSpace(obj));
                    var minx = map.getTiledPosition(obj['posab']['min'],gettileindex.y);
                    var maxx = map.getTiledPosition(obj['posab']['max'],gettileindex.y);

                    //检测边界
                    if(obj.x <minx.x){
                        obj.x = minx.x;
                    }else if(obj.x >maxx.x){
                        obj.x = maxx.x;
                    }
                }
            }

            //检测 砖块 是否成功
            function updateisWin(obj){
                var getcolobj,obj = obj;
                if(obj['id']=='0') {
                    for(var i=0;i<TouchGridChilds.length;i++){
                        var gettileindex = map.getTileIndex(TouchGridChilds[i].parent.convertToWorldSpace(TouchGridChilds[i]));
                        for(var col = 0;col<map.getCol(gettileindex.y).length;col++){
                            getcolobj = map.getCol(gettileindex.y)[col];
                            //过滤掉自己
                            if(!map.isEmptyTile(getcolobj.x,getcolobj.y)&&
                                map.getObjects(getcolobj.x,getcolobj.y)[0]['isme']||
                                getcolobj.x<gettileindex.x){
                                continue;
                            }else if(!map.isEmptyTile(getcolobj.x,getcolobj.y)){
                                me._GameVessel._isWin = false;
                                break;
                            }else if(map.isEmptyTile(getcolobj.x,getcolobj.y)){
                                me._GameVessel._isWin = true;
                            }
                        }
                        break;
                    }

                    if(me._GameVessel._isWin){
                        me.GameOver();
                        obj.runAction(
                            new cc.sequence(cc.moveTo(0.5,cc.p(me.ui['chukou'].x-30,me.ui['chukou'].y)),
                                new cc.CallFunc(function () {
                                    obj.setVisible(false);
                                    GV.UI['GameOver'].show();
                                },obj)
                            )
                        );
                    }

                }
            }
            /**
             * 更新格子在tileMap中的位置
             */
            function updateTile() {
                var obj;
                for(var i=0;i<TouchGridChilds.length;i++){
                    obj = TouchGridChilds[i];
                    if(obj) {
                        obj['isme'] = false;
                        var childindex = map.getTileIndex(obj.parent.convertToWorldSpace(obj));
                        map.snapToTile(obj, childindex.x, childindex.y, true);
                    }
                }
            }
            function GridCallBacks(InputType) {
                function pressCallBack(touch) {
                    cc.log('pressCallBack')
                    var pos = touch._point;
                    updateTile();
                    touchpos['begin'] = this.getPosition();
                    TouchGrid = this;

                    for(var j = 0;j<this._children.length;j++){
                        this._children[j]['isme'] = true;
                        TouchGridChilds.push(this._children[j]);
                    }
                    updateisWin(this);
                }
                function moveCallBack(touch) {
                    cc.log('moveCallBack')
                    var pos = touch._point;
                    touchpos['move']  = pos;
                    if (this['direction'] == '0') {
                        if(!ismove()){
                            this.y = pos.y;
                        }
                    } else if (this['direction'] == '1') {
                        if(!ismove()){
                            this.x = pos.x;
                        }
                    }
                    updateScope();
                }
                function upCallBack(touch) {


                    updateScope();
                    
                    updateTile();

                    GN.Arr.close(me._GameVessel._GridTouchChildrenAll);

                    cc.log('upCallBack')
                }

                switch (InputType){
                    case 'press':
                        return pressCallBack;
                    case 'move':
                        return moveCallBack;
                    case 'up':
                        return upCallBack;
                }
            }

            bindGridEvent();
        }
        ,GameOver : function () {
            var me = this
                ,GridAll = me._GameVessel._GridAll
                ,obj = null
            for(var i=0;i<GridAll.length;i++){
                obj = GridAll[i];
                flax.inputManager.removeAllTouchListeners();
            }
        }
        ,close: function(){
            var me = this;
            me.init('Variable');
            me._GameVessel = null;
        }
    });

    GM.UIMage.BindUIByID(ID,new fun(resGameMove.runGame,ID,BC.CUIType.FL));
})();
