const {Router} = require('express') 
const config = require('config') 
const jwt = require('jsonwebtoken') 
const {check, validationResult} = require('express-validator') 
const User = require('../models/User')  
const router = Router() 

router.post(
    '/register', 
    [
        check('name')
            .isLength({min:3, max:16}).withMessage('Login must be between 3 to 16 characters!')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])/, "i")
            .withMessage('Name must include one lowercase character, one uppercase character!')
            .custom(async(value) => {
                const findName = await User.findOne({name: value})
                if (findName) { 
                    throw new Error('This name are exists!') 
                }
                return true;
            }),
        check('email')
            .isEmail().withMessage('Not an email!')
            .custom(async(value) => {
                const findEmail = await User.findOne({email: value}) 
                if (findEmail) { 
                    throw new Error('This email are exists!') 
                }
                return true;
            }),
        check('password')
            .isLength({min:6, max:16}).withMessage('Password must be between 6 to 16 characters!')
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
            .withMessage('Password must include one lowercase character, one uppercase character, a number, and a special character!'),
        check('checkPassword')
            .isLength({min:1}).withMessage('Enter checkpassword!')
            .custom(async (checkPassword, {req}) => {
                const password = req.body.password
                if(password !== checkPassword){
                  throw new Error('Passwords do not match!')
                }
              }),
        check('role')
            .isLength({min:1}).withMessage('Select a role!'),
    ],
    async (req, res) => {
    try{    
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({ 
                errors: errors.array(),
            })
        }
        const {name, email, password, checkPassword, role} = req.body 
        const icon = 'https://cdn-icons.flaticon.com/png/512/2102/premium/2102647.png?token=exp=1652252114~hmac=64505589ce2e32fe6c5a7a7de8871cda'
        const user = new User({name, email, password, icon, role})
        
        await user.save()

        res.status(201).json({message: "User are created"})  
    } catch (e) {
        res.status(500).json({message: "its Error, try again!"})  
    }
})

module.exports = router
