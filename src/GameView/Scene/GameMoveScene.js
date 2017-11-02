/**
 * Created by QiaoBin on 2017/9/9.
 */
var GameMoveScene = GM.SceneMage.SceneBase.extend({
    CreateGrids : [],
    touchCreateGrids : [],
    Grid:null,
    map : null,
    touchpos:null,
    Layer:null,
    ismove : true,
    iswin : false,
    onEnter: function () {
        this._super();
        var me = this;
        me.touchpos = {};

        var maplayer;
        me.Layer = maplayer = flax.assetsManager.createDisplay(resGameMove.runGame, 'Layer', {parent: this}, true);

//init map
        this.map = GN.initTileMap(53,53,6,6);
        this.map.x+=33;
        this.map.y+=40;
        maplayer['map'].addChild(this.map);

        var Grid;
        if(GN.GAME_PASS_INDEX>GN.MAX_GAME_PASS_INDEX){
            GN.GAME_PASS_INDEX = 1;
        }

        me.Layer['scoreTxt0'].text = GN.GAME_PASS_INDEX;
        var data = GC.GAME_PASS[GN.GAME_PASS_INDEX];
        cc.log(GN.GAME_PASS_INDEX);
        for(var lev = 1;lev<=GN.MAX_GAME_PASS_INDEX;lev++){
            if(lev!=GN.GAME_PASS_INDEX){
                maplayer['lev'+lev].setVisible(false);
            }else{
                maplayer['lev'+lev].setVisible(true);
            }
        }
        for(var i=0;i<data.length;i++){
            Grid = maplayer['lev'+GN.GAME_PASS_INDEX]['test'+data[i]['id']];
           // maplayer['test'+data[i]['id']].setVisible(false);
            Grid.direction = data[i]['direction'];
            Grid.posab = data[i]['pos'];
            Grid.id = data[i]['id'];
             cc.log(Grid.getPosition());
            for(var j=0;j<Grid._children.length;j++){
                var childindex = this.map.getTileIndex(Grid._children[j].parent.convertToWorldSpace(Grid._children[j]));
                Grid._children[j]['isme'] = false;
                this.map.snapToTile(Grid._children[j],childindex.x,childindex.y,true);
            }
            Grid.pos = Grid.getPosition();

            flax.inputManager.addListener(Grid,function (touch) {
                var pos = touch._point;
                me.ismove = true;
                me.touchpos['begin'] = this.getPosition();
                me.Grid = this;
                for(var j = 0;j<this._children.length;j++){
                    this._children[j]['isme'] = true;
                    me.touchCreateGrids.push(this._children[j]);
                }

                var getcolobj;
                if(this['id']=='0') {
                   for(var i=0;i<me.touchCreateGrids.length;i++){
                       var gettileindex = me.map.getTileIndex(me.touchCreateGrids[i].parent.convertToWorldSpace(me.touchCreateGrids[i]));
                        for(var col = 0;col<me.map.getCol(gettileindex.y).length;col++){
                            getcolobj = me.map.getCol(gettileindex.y)[col];
                            if(!me.map.isEmptyTile(getcolobj.x,getcolobj.y)&&
                                me.map.getObjects(getcolobj.x,getcolobj.y)[0]['isme']||
                                getcolobj.x<gettileindex.x){
                                continue;
                            }else if(!me.map.isEmptyTile(getcolobj.x,getcolobj.y)){
                                me.iswin = false;
                                break;
                            }else if(me.map.isEmptyTile(getcolobj.x,getcolobj.y)){
                                me.iswin = true;
                            }
                        }
                       break;
                   }

                   if(me.iswin){
                       me.GameOver();
                       this.runAction(
                          new cc.sequence(cc.moveTo(0.5,cc.p(me.Layer['chukou'].x-30,me.Layer['chukou'].y)),
                           new cc.CallFunc(function () {
                               this.setVisible(false);
                               GV.UI['GameOver'].show();
                           },this)
                          )
                       );
                   }

                }

            },InputType.press,Grid);

            flax.inputManager.addListener(Grid,function (touch) {
                var pos = touch._point;
                if( me.iswin){
                    return;
                }
                me.touchpos['move'] = pos;
                    if (this['direction'] == '0') {
                        if(!me.ismoveTo()){
                            this.y = pos.y;
                        }
                        var gettileindex = me.map.getTileIndex(this.parent.convertToWorldSpace(this));
                        var miny = me.map.getTiledPosition(gettileindex.x,this['posab']['min']['y']);
                        var maxy = me.map.getTiledPosition(gettileindex.x,this['posab']['max']['y']);
                        //检测边界
                        if(this.y <miny.y){
                            this.y = miny.y;

                       //     me.ismove = false;
                        }else if(this.y >maxy.y){
                            this.y = maxy.y;
                           // me.ismove = false;
                        }
                    } else if (this['direction'] == '1') {
                        if(!me.ismoveTo()){
                             this.x = pos.x;
                        }

                        var gettileindex = me.map.getTileIndex(this.parent.convertToWorldSpace(this));
                        var minx = me.map.getTiledPosition(this['posab']['min']['x'],gettileindex.y);
                        var maxx = me.map.getTiledPosition(this['posab']['max']['x'],gettileindex.y);

                        //检测边界
                        if(this.x <minx.x){
                            this.x = minx.x;
                        }else if(this.x >maxx.x){
                            this.x = maxx.x;
                        }
                    }
            },InputType.move,Grid);

            flax.inputManager.addListener(Grid,function (touch) {
                if( me.iswin){
                    return;
                }
                me.updateTile();

                GN.Arr.close(me.touchCreateGrids);
            },InputType.up,Grid);

        }
        me.CreateGrids.push(Grid);
    },
    GameOver:function () {
        var me = this;
    },
   // 是否可以行走
    ismoveTo : function () {
        var obj,me=this,bool=false;
        for(var i=0;i<me.touchCreateGrids.length;i++) {
            obj = me.touchCreateGrids[i];
            var childindex = me.map.getTileIndex(obj.parent.convertToWorldSpace(obj));
            if(me.touchpos['move'].y>me.touchpos['begin'].y&&me.Grid['direction']=='0'){
                //是否有人
                var isEmpty = me.map.isEmptyTile(childindex.x, childindex.y+1)
                var getObject = me.map.getObjects(childindex.x, childindex.y+1);
                var test = !isEmpty&&getObject.length>0&&!getObject[0]['isme']
                if(test){
                    cc.log('y++++'+bool);
                    bool = true;
                    break;
                }
            }else if(me.touchpos['move'].y<me.touchpos['begin'].y&&me.Grid['direction']=='0'){
                //是否有人
                var isEmpty = me.map.isEmptyTile(childindex.x, childindex.y-1)
                var getObject = me.map.getObjects(childindex.x, childindex.y-1);
                var test = !isEmpty&&getObject.length>0&&!getObject[0]['isme']
                if(test){
                    cc.log('y-----'+bool);
                    bool = true;
                    break;
                }
            }
            if(me.touchpos['move'].x>me.touchpos['begin'].x&&me.Grid['direction']=='1'){

                var isEmpty = me.map.isEmptyTile(childindex.x+1, childindex.y)
                var getObject = me.map.getObjects(childindex.x+1, childindex.y);
                var test = !isEmpty&&getObject.length>0&&!getObject[0]['isme']
                if(test){
                    cc.log('x++++'+bool);
                    bool = true;
                    break;
                }
            }else if(me.touchpos['move'].x<me.touchpos['begin'].x&&me.Grid['direction']=='1') {
                var isEmpty = me.map.isEmptyTile(childindex.x - 1, childindex.y)
                var getObject = me.map.getObjects(childindex.x - 1, childindex.y);
                var test = !isEmpty && getObject.length > 0 && !getObject[0]['isme']
                if (test) {
                    cc.log('x-----'+bool);
                    bool = true;
                    break;
                }
            }

        }
        return bool;
    },
    updateTile : function () {
        var me = this,Grid;
        for(var i=0;i<me.touchCreateGrids.length;i++){
            Grid = me.touchCreateGrids[i];
            if(Grid) {
                Grid['isme'] = false;
                var childindex = me.map.getTileIndex(Grid.parent.convertToWorldSpace(Grid));
                me.map.snapToTile(Grid, childindex.x, childindex.y, true);
            }
        }
    },
    onExit:function() {

            this.CreateGrids  = [];
                this.touchCreateGrids  = [];
                this.Grid=null;
            this.map = null;
            this.touchpos=null;
            this.Layer=null;
            this.ismove =true;
            this.iswin =false;
    }
});