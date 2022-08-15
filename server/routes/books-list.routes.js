const { Router } = require('express') 
const Book = require('../models/Book')
const router = Router() 

router.get(
    '/show-books/:id',
    async (req, res) => {
        try {
            const { limit, page, sortField, sortOrder, filter, searchText } = req.query
            const { id } = req?.params

            let books = id.length > 1 ? await Book.find({ sellerId: id }) : await Book.find()
            let filteredBooks = [];
            
            if (!!searchText) {
                filteredBooks = books.filter(book => {
                    return book.bookName.toLowerCase().includes(searchText.toLowerCase().trim()) 
                    || book.author.toLowerCase().includes(searchText.toLowerCase().trim())
                })
                books = filteredBooks?.length ? filteredBooks : []
            }
            
            if (!!filter) {
                const parseFilter = filter.split(';').map(option => option.split('='))
                parseFilter.map(option => {
                    const optionItemInput = option[1].split(',').reduce((acc, i) => ({ ...acc, [i.split(':')[0]]: i.split(':')[1] }), {}) 
                    if (Object.keys(optionItemInput).includes('from') || Object.keys(optionItemInput).includes('to')) {
                        const from = +optionItemInput.from
                        const to = +optionItemInput.to
                        if (!!filteredBooks.length) {
                            filteredBooks = filteredBooks.filter(bookFiltered => {
                                const valueBook = +bookFiltered[option[0]]
                                if (Object.keys(optionItemInput).length === 2) {
                                    return valueBook >= from && valueBook <= to
                                } else if (!!optionItemInput.from){
                                    return valueBook >= from
                                } else if (!!optionItemInput.to){
                                    return valueBook <= to
                                }
                            })
                        } else {
                            return books.map(book => {
                                const valueBook = +book[option[0]]
                                if (Object.keys(optionItemInput).length === 2) {
                                    return valueBook >= from && valueBook <= to && filteredBooks.push(book)
                                } else if (!!optionItemInput.from){
                                    return valueBook >= from && filteredBooks.push(book)
                                } else if (!!optionItemInput.to){
                                    return valueBook <= to && filteredBooks.push(book)
                                }
                            })
                        }
                    } else if (!!filteredBooks.length) {
                        let fullFilter = []
                        filteredBooks.map(book => {
                            return option[1].split(',').map(item =>
                                item === book[option[0]].toLowerCase() && fullFilter.push(book)
                            )
                        })
                        filteredBooks = fullFilter
                    } else {
                        return books.map(book => {
                            return option[1].split(',').map(item => 
                                item === book[option[0]].toLowerCase() && filteredBooks.push(book)
                            )
                        })
                    }
                })
                
                books = filteredBooks?.length ? filteredBooks : []
            }

            const sortFieldDB = sortField === 'year' ? 'year'
                : sortField === 'price' ? 'price'
                    : sortField === 'name' ? 'bookName'
                        : ''

            let sortBooks = books.sort((bookA, bookB) => {
                if (sortFieldDB === 'bookName') {
                    if (sortOrder === 'asc') {
                        if (bookA[sortFieldDB] > bookB[sortFieldDB]) return 1 
                        return -1
                    }
                    if (bookA[sortFieldDB] < bookB[sortFieldDB]) return 1 
                    return -1
                }
                if (sortOrder === 'asc') {
                    return bookA[sortFieldDB] - bookB[sortFieldDB] 
                }
                return bookB[sortFieldDB] - bookA[sortFieldDB]
            })

            const newBooks = !sortField ? books : sortBooks

            res.json({
                data: newBooks.slice(limit * (page - 1), limit * page), 
                totalCount: newBooks?.length || 0 
            })
            
        } catch (e) {
            res.status(500).json({ message: "its Error, try again!" })
        }
    }
)

router.get(
    '/:id',
    async (req, res) => {
        try {
            const { id } = req.params
            let book = await Book.find({ _id: id })
            res.json(book[0])
        } catch (e) {
            res.status(500).json({ message: "its Error, try again!" })
        }
    }
)

module.exports = router
