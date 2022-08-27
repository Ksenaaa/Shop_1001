const { Router } = require('express') 
const Book = require('../models/Book')
const router = Router()

router.delete(
    '/delete-book/:id',
    async (req, res) => {
        try {
            const { id } = req?.params
            
            await Book.deleteOne({ _id: id })
            
            res.status(200).json({ message: "Book deleted", status: 200 })  
        } catch (e) {
            res.status(500).json({ message: "It's Error, try again!" })  
        }
    }
)

module.exports = router
