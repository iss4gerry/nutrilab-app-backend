const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const profileService = require('../services/profile-service')

const createProfile = catchAsync(async (req, res) => {
    const result = await profileService.createProfile(req.body)

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: 'Success',
        data: result
    })
})

module.exports = {
    createProfile,
}