function renderTable() {
    // implement getBooks
    // never call global from controller
   var books=getBooks()
    elTable = document.querySelector('tbody')
    elTable.innerHTML = books.map(book => {
        
        return `<tr>
        <td>
        ${book.id}
        </td>
        <td>
        ${book.title}
        </td>
        <td>
        ${book.price}
        </td>
        <td>
        <button data-trans="read" onclick="onReadBook('${book.id}')">Read</button>
        </td>
        <td>
        <button data-trans="update" onclick="onUpdateBook('${book.id}')">Update</button>
        </td>
        <td>
        <button data-trans="delete" onclick="onRemoveBook('${book.id}')">Delete</button>
        </td>
        </tr>`
    }).join('')
    doTrans()

}
function onSetLang(lang){
    chageCurrLang(lang)
    doTrans()
}
function onRemoveBook(bookId) {
    removeBook(bookId)
    renderTable()
}
function onAddBook() {
    var title = prompt('What is the title of the book?')
    var price = prompt('How much does it cost?')
    addBook(title, price)
    renderTable()
}

function onUpdateBook(bookId) {
    var bookPrice = prompt('what is the book\'s new price?')
    updateBook(bookId, bookPrice)
    renderTable()
}

function onReadBook(bookId) {
    openModal(bookId)

}
function onRateDecrease() {
    var rate
    rate = rateDecrease()
    renderModal(rate)
}
function onRateIncrease() {
    var rate
    rate = rateIncrease()
    renderModal(rate)
}

function onSetFilterBy(filterBy) { 
    console.log(filterBy)
    filterBy = setBookFilter(filterBy)
    renderTable()
    
    const queryStringParams = `?maxPrice=${filterBy.maxPrice}&minRate=${filterBy.minRate}&searchBar=${filterBy.searchBar}&lang=${gCurrLang}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)

}

function renderModal(rate){
    if(rate===undefined)return
    // console.log(rate)
document.querySelector('.txt-rate').innerText=rate

}
function onCloseModal(){
    document.querySelector('.modal').style.display='none'
}
function onSwipe(){
    gHammerContainer.on('swipeleft swiperight',(ev)=>{
        if(ev.type==='swiperight') prevBook()
        else nextBook()
    })
}

function prevBook(){
 var   queryStringParams=new URLSearchParams(window.location.search)
const bookId=queryStringParams.get('bookID')
const idx=getBookIdx(bookId)
const pBook=gBooks[idx].prevId
const pBookIdx=getBookIdx(pBook)
document.querySelector('.txt-rate').innerText = gBooks[pBookIdx].rate
    document.querySelector('.modal h3').innerText=gBooks[pBookIdx].title
    queryStringParams = `?maxPrice=${gFilterBy.maxPrice}&minRate=${gFilterBy.minRate}&searchBar=${gFilterBy.searchBar}&lang=${gCurrLang}&bookID=${pBook}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}
function nextBook(){
    var   queryStringParams=new URLSearchParams(window.location.search)
   const bookId=queryStringParams.get('bookID')
   const idx=getBookIdx(bookId)
   console.log(gBooks[idx])
   const nBook=gBooks[idx].nextId
   console.log(nBook)
   const nBookIdx=getBookIdx(nBook)
   console.log(gBooks[nBookIdx])
   document.querySelector('.txt-rate').innerText = gBooks[nBookIdx].rate
       document.querySelector('.modal h3').innerText=gBooks[nBookIdx].title
       queryStringParams = `?maxPrice=${gFilterBy.maxPrice}&minRate=${gFilterBy.minRate}&searchBar=${gFilterBy.searchBar}&lang=${gCurrLang}&bookID=${nBook}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
   }