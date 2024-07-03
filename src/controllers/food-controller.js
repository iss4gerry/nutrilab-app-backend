const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const foodService = require('../services/food-service')

const foodTracker = catchAsync(async (req, res) => {
    const result = await foodService.foodTracker(req.body)

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: 'Success',
        data: result
    })
})

module.exports = {
    foodTracker
}