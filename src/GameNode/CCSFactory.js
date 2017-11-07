/**
 * Created by jorbeen on 2017/8/29.
 */
(function(){

    cc.Node.prototype.find = function(v){
        v = v.toString();
        if(v.indexOf('.')!=-1){
            var findArr=v.split('.'),tmpNode=this;
            while(findArr.length>0){
                tmpNode = tmpNode.find(findArr.shift().trim());
                if(tmpNode==null)break;
            }
            return tmpNode;
        }

        var me = this,node;
        if(me.getChildByTag && !isNaN(v)){
            node = me.getChildByTag(parseInt(v));
            if(node!=null){
                return node;
            }
        }

        if(me.getChildByName){
            node = me.getChildByName(v);
            if(node!=null){
                return node;
            }
        }
        if(me.getComponent){
            node = me.getComponent(v);
            if(node!=null){
                node = node.getNode();
                return node;
            }
        }

        GN.Log('致命错误!! find子对象时 '+ v + ' 未找到');
    };

    //点击事件
    cc.Node.prototype.touch = function(Type,fun,caller,noSound){
        var me = this;
        this._touchCaller = caller||this;

        //公共点击处理
        function allTouchCallBack() {
            // if(!noSound)X.audio.playEffect('res/sound/click.mp3');
        }
        function addCCListener() {
            me._touchFunction = function(sender,type){
                //公共点击处理
                if(type==ccui.Widget.TOUCH_ENDED){
                    allTouchCallBack();
                }
                fun&&fun.call(me._touchCaller,sender,type);
            };
            me.addTouchEventListener(me._touchFunction,me);
        }

        function addFLListener() {
            me._touchFunction = function(touch, event){
                allTouchCallBack();
                fun&&fun.call(this._touchCaller,touch, event);
            };
            flax.inputManager.addListener(me,me._touchFunction,InputType.click,caller);
        }

        switch (Type){
            case BC.CUIType.CC:
                addCCListener();
                break;
            case BC.CUIType.FL:
                addFLListener();
                break;
            default :
                throw new Error('未匹配UI类型');
                break
        }

    };

    //创建UI
    GN.ccsUI = function(_json,id,type,FLID){
    var ui = ui||{};
    if(id!=null)
        ui.json = function(v,type){
            var node;
            if(type==BC.CUIType.CC){
                ui = new cc.Layer();
                node = ccs.load(v).node;
                ui.addChild(node);
            }else if(type==BC.CUIType.FL){
                FLID = FLID?FLID:"Layer";
                ui = flax.assetsManager.createDisplay(v, FLID, {
                    x: cc.winSize.width/2,
                    y: cc.winSize.height/2
                });
            }else{
                throw new Error('type not Find');
            }

        };
    if(_json!=null)ui.json(_json,type);
    return ui;
};

    /**
     * //创建游戏中的图片与文字标签
     * 创建图片遵循先从plist图和缓存中查找，如果没有创建
     * @param FrameName
     * @param attr
     * @returns {*}
     */

    GN.ccsSprite = function (FrameName,attr) {
    var sprite = null,name=FrameName,SpriteFrame=null;
    if(typeof name === 'string'){
        if(name[0] === '@'){
            sprite = cc.LabelTTF.create(name.slice(1),'微软雅黑',attr['FontSize'],attr['FontColour']);
        }else{
            SpriteFrame = cc.spriteFrameCache.getSpriteFrame(GN.Str.SubStr(2,FrameName,'/'));
            FrameName = SpriteFrame?SpriteFrame:FrameName;
            sprite = new cc.Sprite(FrameName);
        }
        if(sprite){
            sprite.attr(attr)
        }
    }else{
        throw new Error('type not Find');
    }
    return sprite;
};
    /**
     * 先从缓存池查找
     * @param SpriteClass
     * @returns {*}
     */
    GN.ccsSpriteByClass = function (SpriteClass) {
        if(cc.pool.hasObject(SpriteClass))   //判断缓冲池里
        {
            return cc.pool.getFromPool(SpriteClass);   // 从缓冲池里取出
        }
        else
        {
            return new SpriteClass()
        }
    }


GN.Log = function (log) {
    if(BC.Debug)return;
    console.log(log);
};
/*
 获取当前场景
 */
GN.GetRunScene = function () {
    return new cc.Director._getInstance()._runningScene;
};

    /**
     *  基于flax框架  TileMap
     * @param tileWidth 每一个格子的宽
     * @param tileHeight 每一个格子的高
     * @param rows 行
     * @param cols 列
     * @param pos 坐标 默认 0
     * @returns {*}
     */
GN.initTileMap = function(tileWidth, tileHeight,rows,cols,pos,debug){
    var tileMap = new flax.TileMap();
    tileMap.init(tileWidth, tileHeight);
    tileMap.setMapSize(rows, cols);
    pos = pos? pos : {x:0,y:0};
    tileMap.setPosition(pos.x,pos.y);
    debug&&tileMap.showDebugGrid()
    return tileMap;
};

GN.loadUrlImage = function (url, node)
{
    if (url != null && url != undefined && url != "")
    {
        cc.loader.loadImg(url, {isCrossOrigin : true}, function(err,img){
            if(err)
            {
                cc.log(err);
            }
            else
            {
                var texture;
                if (cc.sys.isNative)
                {
                    texture = img;
                }
                else
                {
                    var texture2d = new cc.Texture2D();
                    texture2d.initWithElement(img);
                    texture2d.handleLoadedTexture();
                    texture = texture2d;
                }
                node.setTexture(texture);
            }
        });
    }
};
})();
