const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const fileUpload = require('express-fileupload')

const app = express()

app.use(cors())
app.use(express.json({extended: true}))
app.use(express.static(path.join(__dirname, '/static')))
app.use(fileUpload({}))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/create', require('./routes/create-book.routes'))
app.use('/api/books', require('./routes/books-list.routes'))
app.use('/api/basket', require('./routes/basket.routes'))

const PORT = config.get('port')

const start = async () => {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => console.log(`Port: ${PORT}`))
    } catch (e) {
        process.exit(1)
    }
}

start()
