const { Router } = require('express') 
const Book = require('../models/Book')
const router = Router() 

router.get(
    '/show-books',
    async (req, res) => {
        try {
            const books = await Book.find()
            res.json(books)
        } catch (e) {
            res.status(500).json({message: "its Error, try again!"})
        }
    }
)

router.get(
    '/show-books/:id',
    async (req, res) => {
        try {
            const {id} = req.params
            let books = await Book.find({sellerId: req.params.id})
            res.json(books)
        } catch (e) {
            res.status(500).json({message: "its Error, try again!"})
        }
    }
)

module.exports = router
