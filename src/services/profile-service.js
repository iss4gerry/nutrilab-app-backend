const httpStatus = require('http-status')
const prisma = require('../../prisma/index')
const ApiError = require('../utils/apiError')
const { calculateDailyNutrition, calculateProgressNutrition } = require('../utils/nutritionUtils')

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

const getTotalNutrition = async (userId) => {
    const user = await prisma.userProfile.findFirst({
        where: {
            userId: userId
        }
    })

    return calculateDailyNutrition(user)
}

const getProgressNutrition = async (userId) => {
    const user = await prisma.userProfile.findFirst({
        where: {
            userId: userId
        }
    })

    const nutrition = await prisma.nutrition.findFirst({
        where: {
            userId: userId
        }
    })

    return calculateProgressNutrition(user, nutrition)
}

module.exports = {
    createProfile,
    getTotalNutrition,
    getProgressNutrition
}