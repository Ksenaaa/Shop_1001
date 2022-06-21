const { Router } = require('express') 
const Book = require('../models/Book')
const router = Router() 

router.get(
    '/show-books',
    async (req, res) => {
        try {
            const { id } = req.query
            const idQuery = id.split(',')
            let book = idQuery.map(id => Book.find({ _id: id }))
            const ownerInformation = await Promise.all(book)
            res.json(ownerInformation)
        } catch (e) {
            res.status(500).json({ message: "its Error, try again!" })
        }
    }
)

module.exports = router
