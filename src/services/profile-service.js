const httpStatus = require('http-status')
const prisma = require('../../prisma/index')
const ApiError = require('../utils/apiError')
const { calculateDailyNutrition, calculateProgressNutrition } = require('../utils/nutritionUtils')
const { dayChecker } = require('../utils/dateUtils')

const createProfile = async (body) => {
    try {

        if(body.allergies === ''){
            body.allergies = 'tidak punya'
        }

        const userProfile = await prisma.userProfile.create({
            data: body
        })

        if(userProfile){
            const dailyNutrition = calculateDailyNutrition(userProfile)
            console.log(dailyNutrition)
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
    
    const today = dayChecker(nutrition.updatedAt)
    if(!today){
        const newNutrition = calculateDailyNutrition(user)
        const resetNutrition = await prisma.nutrition.update({
            where: {
                userId: userId
            },
            data: {
                ...newNutrition
            }
        })

        return calculateProgressNutrition(user, resetNutrition)
    }

    return calculateProgressNutrition(user, nutrition)
}

const getProfileById = async(userId) => {
    const result = await prisma.userProfile.findFirst({
        where: {
            userId:userId
        },
        include: {
            user: {
                select: {
                    name:true,
                    email: true
                }
            }
        }
    })

    if(!result){
        throw new ApiError(httpStatus.BAD_REQUEST, 'User not found')
    }

    return result
}

const updateProfile = async(body, userId) => {
    const user = await prisma.userProfile.update({
        where: {
            userId: userId
        },
        data: {
            ...body
        }
    })

    const newNutrition = calculateDailyNutrition(user)

    const nutrition = await prisma.nutrition.update({
        where: {
            userId: userId
        },
        data: {
            ...newNutrition
        }
    })

    return {
        profile: user,
        newNutrition: nutrition
    }
}

const deleteProfile = async(userId) => {

    return await prisma.userProfile.delete({
        where: {
            userId: userId
        }
    })
}

module.exports = {
    createProfile,
    getTotalNutrition,
    getProgressNutrition,
    getProfileById,
    updateProfile,
    deleteProfile
}