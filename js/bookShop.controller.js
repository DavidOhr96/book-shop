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
        <button onclick="onReadBook('${book.id}')">Read</button>
        </td>
        <td>
        <button onclick="onUpdateBook('${book.id}')">Update</button>
        </td>
        <td>
        <button onclick="onRemoveBook('${book.id}')">Delete</button>
        </td>
        </tr>`
    }).join('')

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
    console.log(bookId)
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
    
    const queryStringParams = `?maxPrice=${filterBy.maxPrice}&minRate=${filterBy.minRate}&searchBar=${filterBy.searchBar}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)

}

function renderModal(rate){
    if(rate===undefined)return
    // console.log(rate)
document.querySelector('.txt-rate').innerText=rate

}