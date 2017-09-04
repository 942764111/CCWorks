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
                this.socket = new ReconnectingWebSocket(this.host);
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
                    this.isInit = false;
                };

                this.socket.onclose = function(evt){
                    cc.log('Network onclose...');
                    this.isInit = false;
                };
            },
            send:function(data){
                if (this.isInit){
                    cc.log('Network send:'+data);
                    this.socket.send(data);
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