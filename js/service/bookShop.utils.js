'use strict'
function makeId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var txt = ''
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function changeDirrection(){
    if(gCurrLang==='he')document.querySelector('body').style.direction='rtl'
    else document.querySelector('body').style.direction='ltr'
}

