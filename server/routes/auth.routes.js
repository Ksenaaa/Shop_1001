const { Router } = require('express') 
const config = require('config') 
const jwt = require('jsonwebtoken') 
const { check, validationResult } = require('express-validator') 
const User = require('../models/User')  
const router = Router() 
const bcrypt = require('bcrypt')

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
                    throw new Error('This name exists!') 
                }
                return true;
            }),
        check('email')
            .isEmail().withMessage('Not an email!')
            .custom(async(value) => {
                const findEmail = await User.findOne({email: value}) 
                if (findEmail) { 
                    throw new Error('This email exists!') 
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
                if (password !== checkPassword) {
                  throw new Error('Passwords do not match!')
                }
              }),
        check('role')
            .isLength({min:1}).withMessage('Select a role!'),
    ],
    async (req, res) => {
        try{    
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ 
                    errors: errors.array(),
                })
            }

            const {name, email, password, role} = req.body 
            const hashPassword = await bcrypt.hash(password, 3)
            const icon = 'https://cdn-icons.flaticon.com/png/512/2102/premium/2102647.png?token=exp=1652252114~hmac=64505589ce2e32fe6c5a7a7de8871cda'
            const user = new User({name, email, password: hashPassword, icon, role})
            
            await user.save()

            res.status(201).json({message: "User created"})  
        } catch (e) {
            res.status(500).json({message: "its Error, try again!"})  
        }
    }
)

router.post(
    '/login', 
    [
        check('email')
            .isLength({min:1}).withMessage('Enter email!')
            .custom(async(value) => {
                if (value) {
                    const findEmail = await User.findOne({email: value}) 
                    if (!findEmail) { 
                        throw new Error('This email is not registered!') 
                    }
                }
            }),
        check('password')
            .isLength({min:1}).withMessage('Enter password!')
            .custom(async(password, {req}) => {
                if (password) {
                    const emailUser = req.body.email
                    const findUser = await User.findOne({email: emailUser}) 
                    if (findUser) {
                        const isPassEquals = await bcrypt.compare(password, findUser.password)
                        if (!isPassEquals) {
                            throw new Error('Password do not match!') 
                        }
                    }
                }
            }),
    ],
    async (req, res) => {
        try{    
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ 
                    errors: errors.array(),
                })
            }

            const {email, password} = req.body 
            const findUser = await User.findOne({email}) 
            const isPassEquals = await bcrypt.compare(password, findUser.password)

            if (findUser.email === email) {
                if (isPassEquals) {               
                    const token = jwt.sign(
                        {id: findUser.id},
                        config.get('jwtSecret'),
                        {expiresIn: '1h'}
                    )

                    res.json({
                        token,
                        id: findUser.id,
                        name: findUser.name, 
                        email: findUser.email,
                        icon: findUser.icon,
                        role: findUser.role,
                    })
                    res.status(201).json({message: `User ${findUser.email} login`}) 
                } 
            }
        } catch (e) {
            res.status(500).json({message: "its Error, try again!"})  
        }
    }
)

module.exports = router
