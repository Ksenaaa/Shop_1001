const { Router } = require('express') 
const Book = require('../models/Book')
const searchBooksByNameAndAuthor = require('../utils/search')
const { filterBookByCheckbox, filterBookByRange } = require('../utils/filter')
const sortByField = require('../utils/sort')
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
                filteredBooks = searchBooksByNameAndAuthor(books, searchText)
                books = filteredBooks?.length ? filteredBooks : []
            }

            if (!!filter) {
                const parseFilter = filter.split(';').map(option => option.split('='))
                parseFilter.map(option => {
                    const optionItemInput = option[1].split(',').reduce((acc, i) => ({ ...acc, [i.split(':')[0]]: i.split(':')[1] }), {}) 
                    if (Object.keys(optionItemInput).includes('from') || Object.keys(optionItemInput).includes('to')) {
                        if (!!filteredBooks.length) {
                            let fullFilter = []
                            filterBookByRange(filteredBooks, option, optionItemInput, fullFilter)
                            filteredBooks = fullFilter
                        } else {
                            filterBookByRange(books, option, optionItemInput, filteredBooks)
                        }
                    } else if (!!filteredBooks.length) {
                        let fullFilter = []
                        filterBookByCheckbox(filteredBooks, option, fullFilter)
                        filteredBooks = fullFilter
                    } else {
                        filterBookByCheckbox(books, option, filteredBooks)
                    }
                })
                
                books = filteredBooks?.length ? filteredBooks : []
            }

            const sortBooks = sortByField(books, sortField, sortOrder)

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
