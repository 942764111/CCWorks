/**
 * Created by jorbeen on 2017/8/30.
 */
(function(){
    var ID = 'GameMove2';

    var fun = GM.UIMage.UIBase.extend({
        _GameVessel : null,
        _ismove : false,
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
                me._GameVessel._getTileMap = GN.initTileMap(53,53,6,6,null);
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
                    Grid.scope = data[i]['info']['scope'];
                   // Grid.mepos = data[i]['info']['mepos'];
                    Grid.mepos = false;
                    Grid.id = data[i]['id'];
                    me.ui['lev'+GN.GAME_PASS_INDEX]['test'].debugDraw();
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
            /**
             *  return bool = false     bool = {'data':getObject[0].parent,'direction':'0'} ;
             *  y : 上：0  下：1   x: 右：0 左：1
             * @returns {boolean}
             */
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
                            bool = {'data':getObject[0].parent,'direction':'0'} ;
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

                            bool =  {'data':getObject[0].parent,'direction':'1'} ;
                            break;
                        }
                    }
                    //→
                    if(touchpos['move'].x>touchpos['begin'].x&&TouchGrid['direction']=='1'){

                        var isEmpty = map.isEmptyTile(childindex.x+1, childindex.y)
                        var getObject = map.getObjects(childindex.x+1, childindex.y);
                        var test = !isEmpty&&getObject.length>0&&!getObject[0]['isme']
                        if(test){
                            bool = {'data':getObject[0].parent,'direction':'0'} ;
                            break;
                        }
                    }
                    //←
                    else if(touchpos['move'].x<touchpos['begin'].x&&TouchGrid['direction']=='1') {
                        var isEmpty = map.isEmptyTile(childindex.x - 1, childindex.y)
                        var getObject = map.getObjects(childindex.x - 1, childindex.y);
                        var test = !isEmpty && getObject.length > 0 && !getObject[0]['isme']
                        if (test) {
                            bool = {'data':getObject[0].parent,'direction':'1'} ;
                            break;
                        }
                    }

                }
                return bool;
            }
            //检测越界 并设置在范围中
            function updateScope() {
                var obj = TouchGrid;
                function bionbox(a, b)
                {
                    var aRect = a.getBoundingBox();
                    var bRect = b.getBoundingBox();
                    return cc.rectIntersectsRect(aRect, bRect);
                }

                function ifTouched(a,b) {
                    // a = a.parent.convertToWorldSpace(a);
                    // b = b.parent.convertToWorldSpace(b);
                    cc.log(a.getPosition());
                    cc.log('========================');
                    cc.log(b.getPosition());
                    return flax.ifCollide(a,b)
                }
                if(ifTouched(obj,me.ui['lev'+GN.GAME_PASS_INDEX]['test'])){
                    me._ismove = true;
                   // return true;
                }
                return false;
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
            
            function updateTouchGridPos() {

                if (TouchGrid['direction'] == '0') {

                    if(!ismove()){
                        TouchGrid.y = touchpos['move'].y;
                    }else{
                        if(!TouchGrid['mepos'])return;
                        if(ismove()['direction']=='0'){
                            cc.log(TouchGrid['mepos']['0']);
                            TouchGrid.y = TouchGrid['mepos']['0']==0?
                                ismove()['data'].y-(ismove()['data'].height):
                                ismove()['data'].y+(ismove()['data'].height*TouchGrid['mepos']['0'])

                        }else if(ismove()['direction']=='1'){
                            TouchGrid.y = TouchGrid['mepos']['1']==0?
                                ismove()['data'].y-(ismove()['data'].height):
                                ismove()['data'].y+(ismove()['data'].height*TouchGrid['mepos']['1'])
                        }
                    }
                } else if (TouchGrid['direction'] == '1') {
                    updateScope()
                    if(!me._ismove){
                        TouchGrid.x = touchpos['move'].x;
                    }else{
                        // if(!TouchGrid['mepos'])return;
                        // if(ismove()['direction']=='0'){
                        //     ismove()['data'].x-(ismove()['data'].width*2)
                        //
                        //     // TouchGrid.x = TouchGrid['mepos']['0']==0?
                        //     //     ismove()['data'].x-(ismove()['data'].width):
                        //     //     ismove()['data'].x-(ismove()['data'].width*TouchGrid['mepos']['0'])
                        // }else if(ismove()['direction']=='1'){
                        //     ismove()['data'].x+(ismove()['data'].width*2)
                        //     // TouchGrid.x = TouchGrid['mepos']['1']==0?
                        //     //     ismove()['data'].x+(ismove()['data'].width):
                        //     //     ismove()['data'].x+(ismove()['data'].width*TouchGrid['mepos']['1'])
                        // }
                    }
                }
            }
            function GridCallBacks(InputType) {
                function pressCallBack(touch) {
                    var pos = touch._point;

                    updateTile();
                    touchpos['begin'] = this.getPosition();
                    TouchGrid = this;
                    TouchGrid.debugDraw();
                    for(var j = 0;j<this._children.length;j++){
                        this._children[j]['isme'] = true;
                        TouchGridChilds.push(this._children[j]);
                    }
                    updateisWin(this);
                }
                function moveCallBack(touch) {

                    var pos = touch._point;
                    touchpos['move']  = pos;

                    updateTouchGridPos();
                }
                function upCallBack(touch) {
                    var pos = touch._point;
                    touchpos['move']  = pos;
                    updateTouchGridPos();
                    updateScope();

                    updateTile();

                    GN.Arr.close(me._GameVessel._GridTouchChildrenAll);
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
