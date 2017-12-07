/**
 * Created by QiaoBin on 2017/12/7.
 */
/**
 * Created by long on 15-2-17.
 */

var ScrollingBGTest = cc.Scene.extend({
    onEnter:function()
    {
        this._super();
        var ui = flax.assetsManager.createDisplay(Racinghall.scrollingBG, "ui", {parent:this});

        var sbg = new flax.ScrollingBG(ui['bg']);
        //Following bgs is optional
        //������ӵĸ��౳���ǿ�ѡ��
        sbg.addSource(Racinghall.scrollingBG, "bg0");
        sbg.addSource(Racinghall.scrollingBG, "bg1");
        //���scroll��loop��Ϊfalse�����������ᴥ������¼�
        //if the loop is flase when scroll, scroll over will trigger this event
        sbg.onScrolledOver.add(this._onScrolledOver, this);

        ui['resetBtn']['label'].text = flax.getLanguageStr("reset");
        ui['startxBtn']['label'].text = flax.getLanguageStr("startx");
        ui['startyBtn']['label'].text = flax.getLanguageStr("starty");
        ui['pauseBtn']['label'].text = flax.getLanguageStr("pause");
        ui['resumeBtn']['label'].text = flax.getLanguageStr("resume");

        flax.inputManager.addListener(ui['resetBtn'], function(){
            sbg.reset();
        },null, this);

        flax.inputManager.addListener(ui['startxBtn'], function(){
            sbg.startXScroll(this._getSpeed());
        },null, this);
        flax.inputManager.addListener(ui['startyBtn'], function(){
            sbg.startYScroll(this._getSpeed());
        },null, this);
        flax.inputManager.addListener(ui['pauseBtn'], function(){
            sbg.pauseScroll();
        },null, this);
        flax.inputManager.addListener(ui['resumeBtn'], function(){
            sbg.resumeScroll();
        },null, this);
    },
    _getSpeed:function()
    {
        var s = 200 + Math.random()*800;
        return (Math.random() > 0.5) ? -s : s;
    },
    _onScrolledOver:function()
    {
        cc.log("Scrolled over!");
    }
})