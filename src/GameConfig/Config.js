/**
 * Created by jorbeen on 2017/8/29.
 */
var GC = GC||{};

GC.MAP_CONFIG={
     COLS : 22,//列
     ROWS : 11,//行
     TILE_SIZE : 41// tile_Grid size
};
/*
    形状配置表
 */
GC.GRID_CONFIG={
    'O':{
     'id':'O',
     'draw': {
        '1':[{'x':4 ,'y':GC.MAP_CONFIG.COLS-1},{'x':5 ,'y':GC.MAP_CONFIG.COLS-1},{'x':4 ,'y':GC.MAP_CONFIG.COLS-2},{'x':5 ,'y':GC.MAP_CONFIG.COLS-2}]
    },
    'flaxResid' : 'grid'
    },
    'Z':{
        'id':'Z',
        'draw': {
        '1':[{'x':4 ,'y':GC.MAP_CONFIG.COLS-1},{'x':5 ,'y':GC.MAP_CONFIG.COLS-1},{'x':5 ,'y':GC.MAP_CONFIG.COLS-2},{'x':6 ,'y':GC.MAP_CONFIG.COLS-2}],
        '2':[{'x':5 ,'y':GC.MAP_CONFIG.COLS-3},{'x':6 ,'y':GC.MAP_CONFIG.COLS-1},{'x':5 ,'y':GC.MAP_CONFIG.COLS-2},{'x':6 ,'y':GC.MAP_CONFIG.COLS-2}],
    },
    'flaxResid' : 'grid',
    'showindex' : 1,
    },
    'T':{
        'id':'T',
        'draw':[{'x':4 ,'y':GC.MAP_CONFIG.COLS-1},{'x':5 ,'y':GC.MAP_CONFIG.COLS-1},{'x':6 ,'y':GC.MAP_CONFIG.COLS-1},{'x':5 ,'y':GC.MAP_CONFIG.COLS-2}]},
    'L':{'id':'L','draw':[{'x':5 ,'y':GC.MAP_CONFIG.COLS-1},{'x':5 ,'y':GC.MAP_CONFIG.COLS-2},{'x':5 ,'y':GC.MAP_CONFIG.COLS-3},{'x':6 ,'y':GC.MAP_CONFIG.COLS-3}]},
    //'J':{'id':'J','draw':[{'x':5 ,'y':COLS-1},{'x':5 ,'y':COLS-2},{'x':5 ,'y':COLS-3},{'x':6 ,'y':COLS-3}]},
    'I':{'id':'I','draw':{
        '1':[{'x':5 ,'y':GC.MAP_CONFIG.COLS-1},{'x':5 ,'y':GC.MAP_CONFIG.COLS-2},{'x':5 ,'y':GC.MAP_CONFIG.COLS-3},{'x':5 ,'y':GC.MAP_CONFIG.COLS-4}],
        '2':[{'x':4 ,'y':GC.MAP_CONFIG.COLS-2},{'x':5 ,'y':GC.MAP_CONFIG.COLS-2},{'x':6 ,'y':GC.MAP_CONFIG.COLS-2},{'x':7 ,'y':GC.MAP_CONFIG.COLS-2}]
    }}
};
Object.freeze(GC);