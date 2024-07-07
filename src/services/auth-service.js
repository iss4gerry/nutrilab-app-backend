const httpStatus = require('http-status')
const prisma = require('../../prisma/index')
const bcrypt = require('bcryptjs')
const ApiError = require('../utils/apiError')
const generateToken = require('./token-service')


const existingUser = async (email) => {
    return await prisma.user.findUnique({
        where: {
            email:email
        }
    })
}

const register = async (body) => {
    const user = await existingUser(body.email)

    if(user){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
    }

    body.password = bcrypt.hashSync(body.password, 9)

    return await prisma.user.create({
        data: body
    })
}

const login = async (body, res) => {
    const user = await existingUser(body.email)
    if(!user){
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password')
    }

    const validPassword = await bcrypt.compare(body.password, user.password)
    if(!validPassword){
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password')
    }

    const token = generateToken(user)
    res.setHeader('Authorization', `Bearer ${token}`)

    return user
}

module.exports = {
    register,
    login
}