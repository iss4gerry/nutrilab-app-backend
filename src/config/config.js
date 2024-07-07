const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.join(__dirname, '../../.env')})

module.exports = {
    port: process.env.PORT,
    gemini: {
        key: process.env.GEMINI_KEY
    },
    jwt: {
        secret: process.env.JWT_SECRET
    }
}