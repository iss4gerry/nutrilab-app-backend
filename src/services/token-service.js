const jwt = require('jsonwebtoken')
const config = require('../config/config')

const secretKey = config.jwt.secret

const generateToken = (user) => {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }

    return jwt.sign(payload, secretKey, { expiresIn: '1h' })
}

module.exports = generateToken