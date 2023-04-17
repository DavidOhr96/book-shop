const STORAGE_KEY = 'booksDB'
var gBooks = loadFromStorage(STORAGE_KEY) || [{
    id: 'ZZZZZ',
    title: 'tanach',
    price: 10,
    rate: 1
}, {
    id: 'TTTTT',
    title: 'tanach',
    price: 10,
    rate: 0
}]

var gHammerContainer 
var gIdxBookInModal = ''
var gFilterBy = {
    maxPrice: Infinity,
    minRate: 0,
    searchBar: ''
}
function onInit(){
    renderTable()
    doTrans()
    var elModal=document.querySelector('.modal')
    gHammerContainer=new Hammer(elModal)
    onSwipe()
}

function getBooks() {
    var books = gBooks.filter(book =>
        book.price >= gFilterBy.maxPrice &&
        book.rate >= gFilterBy.minRate &&
        book.title.includes(gFilterBy.searchBar)
            
    )
    putBookIds(books)
    return books

}

function removeBook(bookId) {
    var idx = getBookIdx(bookId)
    if (idx < 0) return
    else gBooks.splice(idx, 1)
    _saveBooks()

}
function addBook(title, price) {
    var newBook = {
        id: makeId(),
        title,
        price,
        rate: 0
    }
    gBooks.push(newBook)
    _saveBooks()
}
function updateBook(bookId, bookPrice) {
    var idx = getBookIdx(bookId)
    gBooks[idx].price = bookPrice
    _saveBooks()

}
function openModal(bookId) {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'block'

    idx = getBookIdx(bookId)
    gIdxBookInModal = idx
    document.querySelector('.txt-rate').innerText = gBooks[idx].rate
    document.querySelector('.modal h3').innerText=gBooks[idx].title
    const queryStringParams = `?maxPrice=${gFilterBy.maxPrice}&minRate=${gFilterBy.minRate}&searchBar=${gFilterBy.searchBar}&lang=${gCurrLang}&bookID=${bookId}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)

}
function rateDecrease() {
    if (gBooks[gIdxBookInModal].rate === 0) return
    gBooks[gIdxBookInModal].rate--
    _saveBooks()
    return gBooks[gIdxBookInModal].rate
}
function rateIncrease() {
    if (gBooks[gIdxBookInModal].rate === 10) return
    gBooks[gIdxBookInModal].rate++
    _saveBooks()
    return gBooks[gIdxBookInModal].rate
}
function getBookIdx(bookId) {
    var idx = gBooks.map(book => book.id).indexOf(bookId)
    return idx
}
function setBookFilter(filterBy) {
    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
    if (filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate
    if (filterBy.searchBar !== undefined) gFilterBy.searchBar = filterBy.searchBar
    return gFilterBy
}
function chageCurrLang(lang) {
    gCurrLang = lang
}
function putBookIds(books) {
    books.forEach((book, idx) => {
        prevId = (idx) ? books[idx - 1].id : 0
        nextId = (idx !== books.length - 1) ? books[idx + 1].id : 0
        console.log(nextId)
        idxGBook=getBookIdx(book.id)
        gBooks[idxGBook].prevId=prevId
        gBooks[idxGBook].nextId=nextId
        
    })
}
function _saveBooks() {
    saveToStorage(STORAGE_KEY, gBooks)
}