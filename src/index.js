const app = require('./app')
const config = require('./config/config')
const prisma = require('../prisma/index')

if(prisma){
    app.listen(config.port, () => {
        console.log(`running on port ${config.port}`)
    })
}

module.exports = app