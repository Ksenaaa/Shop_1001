const { check } = require('express-validator')

const validatorText = [
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
];

const validatorImg = (file, errors, imgError, img) => {
    if (file) {
        const fileExtension = file.mimetype.split('/').pop()
        const exceptedFileType = ['png', 'jpeg', 'jpg', 'webp']

        if (!exceptedFileType.includes(fileExtension)) {
            imgError =  {value: '', param: "img", msg: "Type file is not valid. Only png, jpeg, jpg, webp!"}
            errors.errors.push(imgError)
        }
    } else if (!img) {
        imgError = {value: '', param: "img", msg: "Upload a picture of the book!"}
        errors.errors.push(imgError)
    } 
}

module.exports = { validatorText, validatorImg }
