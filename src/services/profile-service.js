const httpStatus = require('http-status')
const prisma = require('../../prisma/index')
const ApiError = require('../utils/apiError')
const { calculateDailyNutrition } = require('../utils/nutritionUtils')

const createProfile = async (body) => {
    try {
        const userProfile = await prisma.userProfile.create({
            data: body
        })

        if(userProfile){
            const dailyNutrition = calculateDailyNutrition(userProfile)
            const nutrition = await prisma.nutrition.create({
                data: {
                    userId: body.userId,
                    ...dailyNutrition
                }
            })

            return {
                profile: userProfile,
                dailyNutrition: nutrition
            }
        }
    } catch (error) {
        console.log(error.message)
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'An error occurred while creating the profile. Please try again.')
    }
    
}

module.exports = {
    createProfile
}