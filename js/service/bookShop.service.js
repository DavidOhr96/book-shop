const STORAGE_KEY = 'booksDB'
var gBooks = [{
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
var gIdxBookInModal = ''
var gFilterBy = {
    maxPrice: Infinity,
    minRate: 0,
    searchBar:''
}


function getBooks() {
    var books = gBooks.filter(book =>
        book.price >= gFilterBy.maxPrice &&
            book.rate >= gFilterBy.minRate &&
            book.title.includes(gFilterBy.searchBar)
    )
    return books
}

function removeBook(bookId) {
    var idx = getBookIdx(bookId)
    if (idx < 0) return
    else gBooks.splice(idx, 1)
    saveToStorage(STORAGE_KEY, gBooks)

}
function addBook(title, price) {
    var newBook = {
        id: makeId(),
        title,
        price,
        rate: 0
    }
    gBooks.push(newBook)
    saveToStorage(STORAGE_KEY, gBooks)
}
function updateBook(bookId, bookPrice) {
    var idx = getBookIdx(bookId)
    gBooks[idx].price = bookPrice
    saveToStorage(STORAGE_KEY, gBooks)

}
function openModal(bookId) {
    console.log(bookId)
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'block'

    idx = getBookIdx(bookId)
    gIdxBookInModal = idx
    document.querySelector('.txt-rate').innerText = gBooks[idx].rate
}
function rateDecrease() {
    if (gBooks[gIdxBookInModal].rate === 0) return
    gBooks[gIdxBookInModal].rate--
    saveToStorage(STORAGE_KEY, gBooks)
    return gBooks[gIdxBookInModal].rate
}
function rateIncrease() {
    if (gBooks[gIdxBookInModal].rate === 10) return
    gBooks[gIdxBookInModal].rate++
    saveToStorage(STORAGE_KEY, gBooks)
    return gBooks[gIdxBookInModal].rate
}
function getBookIdx(bookId) {
    var idx = gBooks.map(book => book.id).indexOf(bookId)
    return idx
}
function setBookFilter(filterBy) { 
    console.log(222, filterBy.maxPrice)
    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
    if (filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate
    if(filterBy.searchBar !== undefined)gFilterBy.searchBar = filterBy.searchBar
    return gFilterBy
}