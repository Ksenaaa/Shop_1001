const { Router } = require('express') 
const uuid = require('uuid') 
const path = require('path') 
const { validationResult } = require('express-validator')
const { validatorText, validatorImg } = require('../utils/validatorForSetBook')
const Book = require('../models/Book')
const router = Router()

router.put(
    '/edite-book/:id',
    validatorText,
    async (req, res) => {
        try {
            const errors = validationResult(req)
            let imgError
            const { bookName, author, category, page, year, language, price, sellerId, img } = req.body
            const file = req?.files?.img
            const { id } = req?.params

            validatorImg(file, errors, imgError, img)

            if (!errors.isEmpty() || imgError) {
                return res.status(400).json({ errors: errors.array() })
            }
        
            let fileName
            if (!!img) {
                fileName = img
            } else {
                fileName = uuid.v4() + ".jpg"
                file.mv(path.resolve(__dirname, '..', 'static', fileName))
            }

            await Book.updateMany({ _id: id }, { $set: { bookName, author, category, page, year, language, price, img: fileName, sellerId } })
            
            res.status(200).json({ message: "Book edited", status: 200 })  
        } catch (e) {
            res.status(500).json({ message: "It's Error, try again!" })  
        }
    }
)

module.exports = router
