'use strict'
const gTrans={
    filter:{
        en:'filter',
        he:'סינון'
    },
    'search-for':{
        en:'Search for:',
        he:'חפש'
    },
    'max-price':{
        en:'Max price',
        he:'מחיר מרבי'
    },
    'min-rate':{
        en:'Min rate',
        he:'דירוג מינימלי'
    },
    'add-book':{
        en:'Add Book',
        he:'הוסף ספר'
    },
    'id':{
        en:'ID',
        he:'מספר מזהה'
    },
    'title':{
        en:'Title',
        he:'שם הספר'
    },
    'price':{
        en:'Price',
        he:'מחיר'
    },
    'actions':{
        en:'Actions',
        he:'פעולות'
    },
    'head-title':{
        en:'Bookshop managment',
        he:'ניהול מלאי ספרים'
    },
    read:{
        en:'Read',
        he:'קרא'
    },
    update:{
        en:'Update',
        he:'עדכון'
    },
    delete:{
        en:'Delete',
        he:'מחק'
    },
    'modal-rate':{
        en:'Rate',
        he:'דירוג'
    }
}
var gCurrLang='en'

function doTrans(){
    const els=document.querySelectorAll('[data-trans]')
    changeDirrection()
    els.forEach(element => {
        const transKey=element.dataset.trans
        const trans=getTrans(transKey)
        element.innerText=trans
    });
}

function getTrans(transKey){
    const transMap=gTrans[transKey]
    let transTxt=transMap[gCurrLang]
    return transTxt
}
doTrans()