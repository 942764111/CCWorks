/**
 * Created by jorbeen on 2017/8/29.
 */
var GC = GC||{};

// 1 ×óÓÒ   0 ÉÏÏÂ
// GC.GAME_PASS = {
//     '1':[
//         {'id':'0','direction':'1','pos':{'max':{'x':6,'y':4},'min':{'x':1,'y':0}}},
//         {'id':'1','direction':'1','pos':{'max':{'x':4,'y':4},'min':{'x':1,'y':1}}},
//         {'id':'2','direction':'0','pos':{'max':{'x':4,'y':4},'min':{'x':1,'y':1}}},
//         {'id':'3','direction':'1','pos':{'max':{'x':4,'y':4},'min':{'x':0,'y':0}}},
//     ],
//     '2':[
//         {'id':'0','direction':'1','pos':{'max':{'x':6,'y':4},'min':{'x':2,'y':0}}},
//         {'id':'1','direction':'1','pos':{'max':{'x':4,'y':4},'min':{'x':0,'y':0}}},
//         {'id':'2','direction':'1','pos':{'max':{'x':4,'y':4},'min':{'x':0,'y':0}}},
//         {'id':'3','direction':'0','pos':{'max':{'x':5,'y':5},'min':{'x':1,'y':1}}},
//         {'id':'4','direction':'0','pos':{'max':{'x':5,'y':5},'min':{'x':1,'y':1}}},
//         {'id':'5','direction':'1','pos':{'max':{'x':4,'y':4},'min':{'x':1,'y':0}}},
//         {'id':'6','direction':'1','pos':{'max':{'x':4,'y':4},'min':{'x':0,'y':0}}},
//     ]
// }


GC.GRID_STATE_POS = {
    '0':{//me
        'min':1,
        'max':6
    },
    '1':{//¡õ¡õ
       'min':0,
       'max':4
    },
    '2':{//¡õ¡õ(¡ü)
        'min':1,
        'max':5
    },
    '3':{//¡õ¡õ¡õ
        'min':1,
        'max':4
    },
    '4':{//¡õ¡õ¡õ(¡ü)
        'min':1,
        'max':4
    }
}

GC.GAME_PASS = {
    '1':[
        {'id':'0','direction':'1','pos':GC.GRID_STATE_POS['0']},
        {'id':'1','direction':'1','pos':GC.GRID_STATE_POS['3']},
        {'id':'2','direction':'0','pos':GC.GRID_STATE_POS['4']},
        {'id':'3','direction':'1','pos':GC.GRID_STATE_POS['1']},
        {'id':'4','direction':'0','pos':GC.GRID_STATE_POS['2']},
    ],
    '2':[
        {'id':'0','direction':'1','pos':GC.GRID_STATE_POS['0']},
        {'id':'1','direction':'1','pos':GC.GRID_STATE_POS['1']},
        {'id':'2','direction':'1','pos':GC.GRID_STATE_POS['1']},
        {'id':'3','direction':'0','pos':GC.GRID_STATE_POS['2']},
        {'id':'4','direction':'0','pos':GC.GRID_STATE_POS['2']},
        {'id':'5','direction':'1','pos':GC.GRID_STATE_POS['3']},
        {'id':'6','direction':'1','pos':GC.GRID_STATE_POS['1']},
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