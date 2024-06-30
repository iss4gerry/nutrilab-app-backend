const express = require('express')
const app = express()

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World')
})

module.exports = app
