const { Router } = require('express') 
const Book = require('../models/Book')
const router = Router() 

router.get(
    '/books',
    async (req, res) => {
        try {
            const { id } = req.query
            const idQuery = id.split(',')
            let mappedBook = idQuery.map(id => Book.find({ _id: id }))
            const books = await Promise.all(mappedBook)
            res.json(books)
        } catch (e) {
            res.status(500).json({ message: "its Error, try again!" })
        }
    }
)

module.exports = router
