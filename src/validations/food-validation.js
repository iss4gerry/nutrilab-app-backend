const Joi = require('joi')
const { objectId } = require('./custom-validation')

const textTracker = {
    body: Joi.object().keys({
        foodName: Joi.string().required(),
        userId: Joi.string().custom(objectId).required()
    })
}

const getFoodRecommendation = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId)
    })
}

module.exports = {
    textTracker,
    getFoodRecommendation
}