const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const foodService = require('../services/food-service')

const textTracker = catchAsync(async (req, res) => {
    const result = await foodService.nutritionTracker(req.body, req.body.userId)

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: 'Success',
        data: result
    })
})

const getFoodRecommendation = catchAsync(async (req, res) => {
    const result = await foodService.getFoodRecommendation(req.params.userId)

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: 'Success',
        data: result
    })
})

module.exports = {
    textTracker,
    getFoodRecommendation
}