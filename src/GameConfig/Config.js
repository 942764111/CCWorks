/**
 * Created by jorbeen on 2017/8/29.
 */
var GC = GC||{};
GC.GAME_INIT = '1'
GC.GAME_RUN = '2'
GC.GAME_OVER ='4'
GC.GAME_PASS = '3'


GC.STAKE = {
    "10":{"id":"10","value":10},
    "50":{"id":"50","value":50},
    "100":{"id":"100","value":100},
    "500":{"id":"500","value":500},
    "1000":{"id":"1000","value":1000}
}

Object.freeze(GC);