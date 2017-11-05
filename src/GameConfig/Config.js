/**
 * Created by jorbeen on 2017/8/29.
 */
var GC = GC||{};



GC.GRID_STATE_POS = {
    '0':{//me
        'scope':{
            'min':0,
            'max':6
        },
        'mepos':{
            '0':0,
            '1':0
        }
    },
    '1':{//¡õ¡õ
        'scope':{
            'min':0,
            'max':4
        },
        'mepos':{
            '0':0,
            '1':0
        }

    },
    '2':{//¡õ¡õ(¡ü)
        'scope':{
            'min':1,
            'max':5
        },
        'mepos':{
            '0':0,
            '1':2
        }

    },
    '3':{//¡õ¡õ¡õ
        'scope':{
            'min':1,
            'max':4
        },
        'mepos':{
            '0':0,
            '1':2
        }

    },
    '4':{//¡õ¡õ¡õ(¡ü)
        'scope':{
            'min':1,
            'max':4
        },
        'mepos':{
            '0':2,
            '1':2
        }

    }
}

GC.GAME_PASS = {
    '1':[
        {'id':'0','direction':'1','info':GC.GRID_STATE_POS['0']},
        {'id':'1','direction':'1','info':GC.GRID_STATE_POS['3']},
        {'id':'2','direction':'0','info':GC.GRID_STATE_POS['4']},
        {'id':'3','direction':'1','info':GC.GRID_STATE_POS['1']},
        {'id':'4','direction':'0','info':GC.GRID_STATE_POS['2']},
    ],
    '2':[
        {'id':'0','direction':'1','info':GC.GRID_STATE_POS['0']},
        {'id':'1','direction':'1','info':GC.GRID_STATE_POS['1']},
        {'id':'2','direction':'1','info':GC.GRID_STATE_POS['1']},
        {'id':'3','direction':'0','info':GC.GRID_STATE_POS['2']},
        {'id':'4','direction':'0','info':GC.GRID_STATE_POS['2']},
        {'id':'5','direction':'1','info':GC.GRID_STATE_POS['3']},
        {'id':'6','direction':'1','info':GC.GRID_STATE_POS['1']},
    ]
}

GC.GAME_STATE = {
    'INIT':1,
    'STATE':2,
    'OVER':3,
}
GN.GAME_PASS_INDEX = 1;
GN.MAX_GAME_PASS_INDEX = 2;
Object.freeze(GC);