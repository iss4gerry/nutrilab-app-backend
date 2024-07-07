const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const foodService = require('../services/food-service')

const textTracker = catchAsync(async (req, res) => {
    const result = await foodService.nutritionTextTracker(req.body, req.body.userId)

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: 'Success',
        data: result
    })
})

module.exports = {
    textTracker
}