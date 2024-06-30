const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(cors())
app.use('*', cors())

app.get('/', (req, res) => {
    res.send('Hello World')
})

module.exports = app
