const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const fileUpload = require('express-fileupload')

const app = express()

const corsOptions = {
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(express.json({extended: true}))
app.use(express.static(path.join(__dirname, '/static')))
app.use(fileUpload({}))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/create', require('./routes/create-book.routes'))
app.use('/api/edite', require('./routes/edite-book.routes'))
app.use('/api/delete', require('./routes/delete-book.routes'))
app.use('/api/books', require('./routes/books-list.routes'))
app.use('/api/basket', require('./routes/basket.routes'))

const PORT = process.env.PORT || config.get('port')

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
