var Socket  = (function(){
    var instance = null;
    function getNetworkInstance (){
        var networkInstance = {
            socket:null,
            isInit:false,
            initNetwork:function(){
                GN.log('Network initSocket...');
                this.host = "ws://192.168.188.34:8080/com.cn/websocket";
                this.socket = new ReconnectingWebSocket(this.host);
                var self = this;
                this.socket.onopen = function(evt) {
                    GN.log('Network onopen...');
                    self.isInit = true;
                };
    
                this.socket.onmessage = function(evt){
                    var data  = GN.Obj.toJSON(evt.data);
                    GN.Log(data);
                    GN.log('Network onmessage...');
                };

                this.socket.onerror = function(evt){
                    GN.log('Network onerror...');
                    this.isInit = false;
                };

                this.socket.onclose = function(evt){
                    GN.log('Network onclose...');
                    this.isInit = false;
                };
            },
            send:function(data){
                if (this.isInit){
                    GN.log('Network send:'+data);
                    this.socket.send(data);
                }
            },
            close:function(){
                if (this.socket){
                    GN.log("Network close...");
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