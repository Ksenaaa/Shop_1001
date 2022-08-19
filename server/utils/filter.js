const filterBooksByCheckbox = (allBooks, option, addHereBook) => {
    return allBooks.forEach(book => {
        return option[1].split(',').forEach(item =>
            item === book[option[0]].toLowerCase() && addHereBook.push(book)
        )
    })
}

const filterBooksByRange = (allBooks, option, itemInput, addHereBook) => {
    const from = +itemInput.from
    const to = +itemInput.to

    return allBooks.forEach(book => {
        const valueBook = +book[option[0]]
        if (Object.keys(itemInput).length === 2) {
            return valueBook >= from && valueBook <= to && addHereBook.push(book)
        } else if (!!itemInput.from){
            return valueBook >= from && addHereBook.push(book)
        } else if (!!itemInput.to){
            return valueBook <= to && addHereBook.push(book)
        }
    })
}

module.exports = { filterBooksByCheckbox, filterBooksByRange }
