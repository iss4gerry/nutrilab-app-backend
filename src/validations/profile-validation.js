const Joi = require('joi')
const { objectId } = require('./custom-validation')

const createProfile = {
    body: Joi.object().keys({
        userId: Joi.string().custom(objectId).required(),
        gender: Joi.string().required(),
        dateOfBirth: Joi.string().required(),
        allergies: Joi.string(),
        weight: Joi.number().required(),
        height: Joi.number().required()
    })
}

module.exports = {
    createProfile
}