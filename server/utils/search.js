const searchBooksByNameAndAuthor = (allBooks, text) => {
    return allBooks.filter(book => {
        return book.bookName.toLowerCase().includes(text.toLowerCase().trim()) 
        || book.author.toLowerCase().includes(text.toLowerCase().trim())
    })
}

module.exports = searchBooksByNameAndAuthor
