const { Router } = require('express') 
const config = require('config') 
const uuid = require('uuid') 
const path = require('path') 
const jwt = require('jsonwebtoken') 
const { check, validationResult } = require('express-validator') 
const Book = require('../models/Book')
const router = Router() 

router.post(
    '/create-book',
    [
        check('bookName')
            .isLength({min:1, max:200}).withMessage('Enter book name!'),
        check('author')
            .isLength({min:1, max:50}).withMessage('Enter author!'),
        check('category')
            .isLength({min:1}).withMessage('Сhoose category!'),
        check('page')
            .isLength({min:1, max:5}).withMessage('Enter number of pages!')
            .matches("^[0-9]*$")
            .withMessage('Field must contain only numbers!'),
        check('year')
            .isLength({min:1, max:4}).withMessage('Enter year of publication!')
            .matches("^[0-9]*$")
            .withMessage('Field must contain only numbers!'),
        check('language')
            .isLength({min:1, max:15}).withMessage('Enter language of the book!'),
        check('price')
            .isLength({min:1, max:10}).withMessage('Enter cost of the book!')
            .matches("[^0-9.]*$")
            .withMessage('Field must contain only numbers!'),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            const {bookName, author, category, page, year, language, price, sellerId} = req.body 
            const img = req?.files?.img
            let imgError

            if(img) {
                const fileExtension = img.mimetype.split('/').pop()
                const exceptedFileType = ['png', 'jpeg', 'jpg', 'webp']

                if(!exceptedFileType.includes(fileExtension)) {
                    imgError =  {value: '', param: "img", msg: "Type file is not valid. Only png, jpeg, jpg, webp!"}
                    errors.errors.push(imgError)
                }
            } else {
                imgError = {value: '', param: "img", msg: "Upload a picture of the book!"}
                errors.errors.push(imgError)
            } 

            if(!errors.isEmpty() || imgError) {
                return res.status(400).json({errors: errors.array()})
            }

            const fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const book = new Book({bookName, author, category, page, year, language, price, img: fileName, sellerId})
            await book.save()

            res.status(200).json({message: "Book are created", status: 200})  
        } catch (e) {
            res.status(500).json({message: "its Error, try again!"})  
        }
    }
)

module.exports = router
