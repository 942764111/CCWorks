/**
 * Created by jorbeen on 2017/9/1.
 */
var WebSocket = WebSocket || window.WebSocket || window.MozWebSocket;


var Network  = (function(){
    var instance = null;
    function getNetworkInstance (){
        var networkInstance = {
            socket:null,
            isInit:false,
            initNetwork:function(){
                cc.log('Network initSocket...');
                this.host = "ws://192.168.188.34:8080/com.cn/websocket";
                this.testhost = "ws://echo.websocket.org"
                this.socket = new WebSocket(this.host);
                var self = this;
                this.socket.onopen = function(evt){
                    cc.log('Network onopen...');

                    self.isInit = true;
                };

                this.socket.onmessage = function(evt){
                    var data = evt.data;
                    cc.log('Network onmessage...');

                };

                this.socket.onerror = function(evt){
                    cc.log('Network onerror...');

                };

                this.socket.onclose = function(evt){
                    cc.log('Network onclose...');
                    this.isInit = false;
                };
            },
            send:function(data){
                this.socket.send(data);
                if (this.isInit){
                    cc.log('Network is not inited...');
                }else if(this.socket.readyState == WebSocket.OPEN){
                    cc.log('Network send:'+data);
                    this.socket.send(data);
                }else{
                    cc.log('Network WebSocket readState:'+this.socket.readyState);
                }
            },
            close:function(){
                if (this.socket){
                    cc.log("Network close...");
                    this.socket.close();
                    this.socket = null;
                }
            }
        };
        return networkInstance;
    };


    return {
        getInstance:function(){
            if(instance === null){
                instance = getNetworkInstance();
            }
            return instance;
        }
    };
})();