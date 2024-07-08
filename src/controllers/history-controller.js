const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const historyService = require('../services/history-service')

const getAllHistory = catchAsync(async (req, res) => {
    const result = await historyService.getAllHistory()

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: 'Success',
        data: result
    })
})

const getUserHistory = catchAsync(async (req, res) => {
    const result = await historyService.getUserHistory(req.params.userId)

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: 'Success',
        data: result
    })
})

module.exports = {
    getAllHistory,
    getUserHistory
}