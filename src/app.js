const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const errorHandler = require('./middlewares/error')
const router = require('./routes/index')

const app = express()

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(cors())
app.use('*', cors())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use(router)
app.use(errorHandler)

module.exports = app
