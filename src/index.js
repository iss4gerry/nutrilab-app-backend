const app = require('./app')
const config = require('./config/config')

app.listen(config.port, () => {
    console.log(`running on port ${config.port}`)
})

module.exports = app