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

const getProfileById = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId)
    })
}

const updateProfile = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId)
    }),
    body: Joi.object().keys({
        gender: Joi.string(),
        dateOfBirth: Joi.string(),
        allergies: Joi.string(),
        weight: Joi.number(),
        height: Joi.number()
    })
}

const getNutrition = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId)
    })
}

module.exports = {
    createProfile,
    getProfileById, 
    updateProfile,
    getNutrition
}