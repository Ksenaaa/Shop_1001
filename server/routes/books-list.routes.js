const { Router } = require('express') 
const Book = require('../models/Book')
const router = Router() 

router.get(
    '/show-books',
    async (req, res) => {
        try {
            const {limit, page} = req.query
            const books = await Book.find()
            res.json({
                data: books.slice(limit * (page - 1), limit * page), 
                totalCount: books?.length - 1 || 0 
            })
        } catch (e) {
            res.status(500).json({message: "its Error, try again!"})
        }
    }
)

router.get(
    '/show-books/:id',
    async (req, res) => {
        try {
            const {limit, page} = req.query
            const {id} = req.params
            const books = await Book.find({sellerId: req.params.id})
            res.json({
                data: books.slice(limit * (page - 1), limit * page), 
                totalCount: books?.length - 1 || 0 
            })
        } catch (e) {
            res.status(500).json({message: "its Error, try again!"})
        }
    }
)

router.get(
    '/:id',
    async (req, res) => {
        try {
            const {id} = req.params
            let book = await Book.find({_id: req.params.id})
            res.json(book[0])
        } catch (e) {
            res.status(500).json({message: "its Error, try again!"})
        }
    }
)

module.exports = router
