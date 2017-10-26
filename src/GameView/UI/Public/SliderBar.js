/**
 * Created by lull on 2017/10/19.
 */
var SliderBar = cc.Node.extend({
    _sliderFileName: null, //滚动条图片路径
    _backgroundFileName: null, //滚动条背景图路径
    _bgSize: null, //画条背景图显示的区域
    _multiple: null, //滑块显示区域与总区域比例
    _sliderSize: null, //滑条显示区域
    _bgSprite: null, //背景sprite
    _sliderSprite: null, //滚动条sprite
    _beginPos: null, //滚动条的起始位置
    _endPos: null, //滚动条的最终位置

    ctor: function (sliderFileName, backgroundFileName, bgSize, multiple) {
        this._super();

        if(!sliderFileName || !backgroundFileName){
            cc.log("wrong args,check it !");
        }
        this._sliderFileName = sliderFileName;
        this._backgroundFileName = backgroundFileName;
        this._bgSize = bgSize;
        this._multiple = multiple;

        if (!this.init()) {
            return false;
        }
    },

    init: function () {
        this._bgSprite = cc.Scale9Sprite.create(this._backgroundFileName);
        this._bgSprite.setContentSize(cc.size(this._bgSprite.getContentSize().width, this._bgSize.height));
        this.addChild(this._bgSprite);

        this._sliderSprite = cc.Scale9Sprite.create(this._sliderFileName);
        this._sliderSprite.setContentSize(cc.size(this._sliderSprite.getContentSize().width, this._bgSize.height / this._multiple));
        this.addChild(this._sliderSprite);

        this._beginPos = cc.p(0, -this._bgSize.height / 2 + this._sliderSprite.getContentSize().height / 2);
        this._endPos = cc.p(0, this._bgSize.height / 2 - this._sliderSprite.getContentSize().height / 2);
        this._sliderSize = this._sliderSprite.getContentSize();
        this._sliderSprite.setPosition(this._beginPos);

        return true;
    },

    setValue: function (value) {

//正常范围内活动
        if (value >= 0 && value <= 1) {
//重定位
//this._sliderSprite.setContentSize(this._sliderSize);
            this._sliderSprite.setPosition(cc.p(0, this._beginPos.y + (this._endPos.y - this._beginPos.y) * value));
        }
//滑动到最下侧
        else if (value < 0 && value > -0.8) {
            var conDownValue = this._sliderSize.height + value * this._sliderSize.height;
            if(conDownValue < 100){
                return;
            }
            var moveBeginPosY = this._beginPos.y + value * this._sliderSize.height / 2;
            moveBeginPosY = moveBeginPosY < -this._bgSize.height / 2 ? -this._bgSize.height / 2 : moveBeginPosY;
            this._sliderSprite.setContentSize(cc.size(this._sliderSize.width, conDownValue));
            this._sliderSprite.setPosition(cc.p(0, moveBeginPosY));
        }
//滑动到最上侧
        else if (value > 1 && value < 1.8) {
            var conUpValue = this._sliderSize.height + (1 - value) * this._sliderSize.height;
            if(conUpValue < 100){
                return;
            }
            var moveEndPosY = this._endPos.y - (1 - value) * this._sliderSize.height / 2;
            moveEndPosY = moveEndPosY > this._bgSize.height / 2 ? this._bgSize.height / 2 : moveEndPosY;
            this._sliderSprite.setContentSize(cc.size(this._sliderSize.width, conUpValue));
            this._sliderSprite.setPosition(cc.p(0, moveEndPosY));
        }
    },
//刷新进度条状态
    refreshSliderStatus: function (bgSize, multiple) {
        this._bgSize = bgSize;
        this._multiple = multiple;
        this._bgSprite.setContentSize(cc.size(this._bgSprite.getContentSize().width, this._bgSize.height));
        this._sliderSprite.setContentSize(cc.size(this._sliderSprite.getContentSize().width, this._bgSize.height / this._multiple));
        this._beginPos = cc.p(0, -this._bgSize.height / 2 + this._sliderSprite.getContentSize().height / 2);
        this._endPos = cc.p(0, this._bgSize.height / 2 - this._sliderSprite.getContentSize().height / 2);
        this._sliderSize = this._sliderSprite.getContentSize();
//this._sliderSprite.setPosition(this._beginPos);//备用
    },
//设置透明度
    setOpacity: function (value) {
        var children = this.getChildren();
        for (var k = 0; k < children.length; k++) {
            children[k].setOpacity(value);
        }
    },
//设置隐藏
    setVisible: function (bVis) {
        var children = this.getChildren();
        for (var k = 0; k < children.length; k++) {
            children[k].setVisible(bVis);
        }
    },
//渐变消失
    runFadeoutAction: function (value) {
        var children = this.getChildren();
        for (var k = 0; k < children.length; k++) {
            var fadeout = cc.FadeOut.create(value);
            children[k].runAction(fadeout);
        }
    },
//渐变出现
    runFadeinAction: function (value) {
        var children = this.getChildren();
        for (var k = 0; k < children.length; k++) {
            var fadein = cc.FadeIn.create(value);
            children[k].runAction(fadein);
        }
    },
//停止动作
    stopAllActions: function () {
        var children = this.getChildren();
        for (var k = 0; k < children.length; k++) {
            children[k].stopAllActions();
        }
    },
    onEnter: function () {
        this._super();
    },
    onExit: function () {
        this._super();
    }
});