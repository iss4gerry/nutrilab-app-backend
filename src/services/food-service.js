const { GoogleGenerativeAI } = require('@google/generative-ai')
const ApiError = require('../utils/apiError')
const httpStatus = require('http-status')
const { calculateDailyNutrition, calculateProgressNutrition } = require('../utils/nutritionUtils')
const prisma = require('../../prisma/index')
const config = require('../config/config')
const { dayChecker } = require('../utils/dateUtils')
const apiKey = config.gemini.key
const genAi = new GoogleGenerativeAI(apiKey)

const textTracker = async (foodName) => {
    return new Promise(async (resolve, reject) => {
        const model = genAi.getGenerativeModel({model: 'gemini-1.5-flash'})
        const prompt = `dari makanan ${foodName} analisis kandungan nutrisinya dengan nilai tetap (tanpa menggunakan rentang) dan tanpa menggunakan satuan (misalnya gram, kkal, dll) hanya gunakan angka total nutrisi yang terkandung. Jika ada yang tidak punya nilai isi dengan 0, 
        kirim response dengan format string persis seperti dibawah ini tanpa tambahan apapun, ingat jangan dikirim berformat json 
        {
            "foodName": "{food_name}",
            "foodInformation": "{food_information_dalambahasaindonesia_minimal25kata_maksimal30kata}",
            "calorie": "{calorie_count_kkal}",
            "sugar": "{sugar_content_grams}",
            "carbohydrate": "{carbohydrate_content_grams}"
            "fat": "{fat_content_grams}"
            "protein": "{protein_content_grams}"
        }
        `
        try {
            const result = await model.generateContent(prompt)
            const response = await result.response.text()
            const food = JSON.parse(response)
            food.calorie = parseFloat(food.calorie)
            food.sugar = parseFloat(food.sugar)
            food.carbohydrate = parseFloat(food.carbohydrate)
            food.fat = parseFloat(food.fat)
            food.protein = parseFloat(food.protein)
            return resolve(food)
        } catch (err) {
            return reject(err)
        }
    }) 
}

const nutritionTracker = async (body, userId) => {
    const nutrition = await prisma.nutrition.findFirst({
        where: {
            userId: userId
        }
    })

    const userProfile = await prisma.userProfile.findFirst({
        where: {
            userId: userId
        }
    })

    const today = dayChecker(nutrition.updatedAt)
    if(!today){

        const resetNutrition = calculateDailyNutrition(userProfile)

        await prisma.nutrition.update({
            where: {
                userId: userId
            },
            data: {
                ...resetNutrition
            }
        })
    }
    
    const food = await textTracker(body.foodName)
    if(food){
        const nutrition = await prisma.nutrition.findFirst({
            where: {
                userId: userId
            }
        })

        const { foodName, foodInformation, calorie, sugar, carbohydrate, fat, protein } = food
        const updateNutrition = await prisma.nutrition.update({
            where: {
                userId: userId
            },
            data:{
                dailyCalorie: nutrition.dailyCalorie - calorie,
                dailySugar: nutrition.dailySugar - sugar,
                dailyCarbohydrate: nutrition.dailyCarbohydrate - carbohydrate,
                dailyFat: nutrition.dailyFat - fat,
                dailyProtein: nutrition.dailyProtein - protein
            }
        })

        await prisma.history.create({
            data: {
                userId: userId,
                foodName: foodName,
                foodInformation: foodInformation,
                totalCalorie: calorie,
                totalSugar: sugar,
                totalCarbohydrate: carbohydrate,
                totalFat: fat,
                totalProtein: protein
            }
        })

        const resultData = {
            foodInfo: food,
            progressNutrition: calculateProgressNutrition(userProfile, updateNutrition)
        }

        return resultData
    }
}

module.exports = {
    textTracker,
    nutritionTracker
}