/**
 * Created by QiaoBin on 2017/9/9.
 */
/**
 * Created by jorbeen on 2017/8/29.
 */
(function(){
    var ID = 'GameMove';

    var fun = GM.UIMage.UIBase.extend({
        GridtileMap      : null,
        GridLayertileMap : null,
        Gameon_off  :   0,
        getGridObjects   : [],
        INDEX   :   1,
        ctor: function(json,id,type){
            this._super(json,id,type);
        },
        show : function(){
            this._super(this.showed);
        },
        showed : function() {
            var me = this;

            this.initMap();
            me.DrawOneGridForm('Z',1);

            //
            me.CreateGrid = flax.assetsManager.createDisplay(res.poppingStars, 'grid2', {parent: me.ui}, true);
            me.GridtileMap.snapToTile(me.CreateGrid,5,5,true);
            me.ui.find('layer.Btns.rotateBtn').touch(BC.CUIType.CC,function (sender,type) {
                if (type == ccui.Widget.TOUCH_ENDED){
                    me.INDEX++;
                    if(me.INDEX>2){
                        me.INDEX=1;
                    }
                    me.GirdState('Z',me.INDEX);
                }
            },this);

            me.ui.find('layer.Btns.leftBtn').touch(BC.CUIType.CC,function (sender,type) {
                if (type == ccui.Widget.TOUCH_ENDED){
                    me.leftBtns();
                }
            },this);

            me.ui.find('layer.Btns.rightBtn').touch(BC.CUIType.CC,function (sender,type) {
                if (type == ccui.Widget.TOUCH_ENDED){
                    me.rightBtns();
                }
            },this);
        }
        ,GameState : function(State){
            switch (State){
                case 'State':break;
            }
        }
        ,initMap : function(){
            var me = this;

            /*
                Grid背景
             */
            function DrawGridLayerMap(){
                me.GridLayertileMap = GN.initTileMap(
                    GC.MAP_CONFIG.TILE_SIZE,
                    GC.MAP_CONFIG.TILE_SIZE,
                    GC.MAP_CONFIG.ROWS,
                    GC.MAP_CONFIG.COLS,
                    {x:me.ui.find('layer.tetrisLayer').x/2-85,
                     y:me.ui.find('layer.tetrisLayer').y/2-80}
                );
                for(var i = 0; i < GC.MAP_CONFIG.ROWS; i++)
                {
                    for(var j = 0; j < GC.MAP_CONFIG.COLS; j++)
                    {
                        var star = flax.assetsManager.createDisplay(res.poppingStars, "gridLayer", {parent: me.ui}, true);
                        me.GridLayertileMap.snapToTile(star, i, j, true);
                    }
                }
            }
            /*
                初始化Grid
             */
            function initGridMap(){
                me.GridtileMap = GN.initTileMap(
                    GC.MAP_CONFIG.TILE_SIZE,
                    GC.MAP_CONFIG.TILE_SIZE,
                    GC.MAP_CONFIG.ROWS,
                    GC.MAP_CONFIG.COLS,
                    {x:me.ui.find('layer.tetrisLayer').x/2-85,
                     y:me.ui.find('layer.tetrisLayer').y/2-80}
                );
                me.GridtileMap.setAnchorPoint(0,0);
            }
            DrawGridLayerMap();
            initGridMap();

        }
        /**
         * 画一个形状
         * @constructor
         */
        ,DrawOneGridForm : function(Form,showindex){
            var me = this;
            me.GridObjectsindex++;
            me.getGridObjects  = [];
            me.Gameon_off++;
            if(!me.GridtileMap){GN.Log('me.GridtileMap is null') ;return}
            var GridConfig = GC.GRID_CONFIG[Form];
            var index = function(){
                var maxindex = 0;
                var index = showindex || GridConfig['showindex'];
                for(var i=0 in GridConfig['draw']){
                    maxindex++;
                }
                if(index>maxindex){
                    index = (showindex)? 1 : 0;
                }
                if(index<=0){
                    index = (showindex)? 1 : 0;
                }
                (showindex||showindex<=0) ? index : GridConfig['showindex'] = index+=1;
                return index;
            }();
            var Grid = GridConfig['draw'][index];
            var Gridres = GridConfig['flaxResid'];

            me.ui.find('layer.Btns.rotateBtn').setTouchEnabled(true);
           // cc.log( me.getGridObjects);
            for(var a = 0;a<Grid.length;a++){
                var CreateGrid = flax.assetsManager.createDisplay(res.poppingStars, Gridres, {parent: me.ui}, true);
                me.GridtileMap.snapToTile(CreateGrid,Grid[a]['x'],Grid[a]['y'],true);
              //  cc.log( me.GridtileMap.getTileIndex(CreateGrid));
                me.getGridObjects.push(CreateGrid);
            }
            this.RunGame();
        },
        isOnelineTrue : function(){
            //var row =me.tetrisMap.getCol(4);
            //for(var i = 0;i<row.length;i++){
            //    if(!me.tetrisMap.isEmptyTile(row[i].x,row[i].y)){
            //        cc.log(row[i].x,row[i].y);
            //    }
            //}
        }
        ,RunGame : function(){
            var me = this;
            /**
             * 移动精灵
             * @constructor
             */
            var TileIndex;
            var on_off = true;
            function Move(){
                if(!on_off){
                    me.ui.unschedule(Move);
                    me.ui.find('layer.Btns.rotateBtn').setTouchEnabled(false);
                    me.DrawOneGridForm('Z',1);
                    me.INDEX = 1;
                }
                for(var i=0;i<me.getGridObjects.length;i++){
                    TileIndex = me.GridtileMap.getTileIndex(me.getGridObjects[i]);
                    TileIndex.y -=1;
                    me.GridtileMap.snapToTile(me.getGridObjects[i],TileIndex.x,TileIndex.y,true);

                    if(me.getGridObjects[i].isCollision&& !me.GridtileMap.isEmptyTile(TileIndex.x,TileIndex.y-1)
                        || me.getGridObjects[i].isCollision&& TileIndex.y-1<0){
                        on_off = false;
                        me.ui.find('layer.Btns.rotateBtn').setTouchEnabled(false);
                    }
                }
            }
            me.ui.schedule(Move,0.3);
        }
        ,GirdState : function(Form,showindex){
            var me = this;
            if(me.getGridObjects.length<=0)return;


            function Z(showindex){
                cc.log(showindex);
                var  GridObject0,GridObject1,GridObject2,GridObject3;
                switch(showindex){
                    case 1:
                        GridObject0 = me.GridtileMap.getTileIndex(me.getGridObjects[0]);
                        GridObject1 = me.GridtileMap.getTileIndex(me.getGridObjects[3]);
                        me.GridtileMap.snapToTile(me.getGridObjects[0],GridObject0.x,GridObject0.y+1,true);
                        me.GridtileMap.snapToTile(me.getGridObjects[3],GridObject1.x+2,GridObject1.y+1,true);
                        me.setisCollision([0,3,2]);
                        break;
                    case 2:
                        //me.setisCollision([2,3]);
                        //for(var i=0;i<me.getGridObjects.length;i++){
                        //    var TileIndex = me.GridtileMap.getTileIndex(me.getGridObjects[i]);
                        //    if(me.getGridObjects[i].isCollision&& !me.GridtileMap.isEmptyTile(TileIndex.x,TileIndex.y-1)
                        //        || me.getGridObjects[i].isCollision&& TileIndex.y-1<0){
                        //            me.setisCollision([0,3,2]);
                        //            return;
                        //    }
                        //}

                        GridObject0 = me.GridtileMap.getTileIndex(me.getGridObjects[0]);
                        GridObject1 = me.GridtileMap.getTileIndex(me.getGridObjects[3]);
                        me.GridtileMap.snapToTile(me.getGridObjects[0],GridObject0.x,GridObject0.y-1,true);
                        me.GridtileMap.snapToTile(me.getGridObjects[3],GridObject0.x,GridObject1.y-1,true);

                        break;
                }
            }
            switch(Form){
                case 'Z':
                    Z(showindex);
                    break;
                case 'O':
                    break;

            }

        }

        ,setisCollision : function(index){
            var me = this;
            for(var i=0;i<me.getGridObjects.length;i++){
                me.getGridObjects[i].isCollision = false;
            }

            for(var j=0;j<index.length;j++){
                me.getGridObjects[index[j]].isCollision = true;
            }
        }
        ,getGridObjectIndex : function(){
            var me = this;
            GN.Log('=========================================================');
            for(var i=0;i<me.getGridObjects.length;i++){
                GN.Log(me.GridtileMap.getTileIndex(me.getGridObjects[i]));

            }
        }

        ,leftBtns : function(){
            var me = this;
            var TileIndex;
            for(var i=0;i<me.getGridObjects.length;i++){
                TileIndex = me.GridtileMap.getTileIndex(me.getGridObjects[i]);
                TileIndex.x -=1;
                if(TileIndex.x>0){
                    me.GridtileMap.snapToTile(me.getGridObjects[i],TileIndex.x,TileIndex.y,true);
                }
            }
        }
        ,rightBtns : function(){
            var me = this;
            var TileIndex;
            for(var i=0;i<me.getGridObjects.length;i++){
                TileIndex = me.GridtileMap.getTileIndex(me.getGridObjects[i]);
                TileIndex.x +=1;
                if(TileIndex.x<22){
                    me.GridtileMap.snapToTile(me.getGridObjects[i],TileIndex.x,TileIndex.y,true);
                }
            }
        }
        ,close: function(){

        }
    });

    GM.UIMage.BindUIByID(ID,new fun(res.gamemove_json,ID,BC.CUIType.CC));
})();
