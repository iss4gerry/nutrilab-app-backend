const { calculateAge } = require('./dateUtils')

const calculateCalories = (gender, weight, height, age) => {
    let calories
    if (gender === 'male') {
      calories = Math.round(66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age))
    } else if (gender === 'female') {
      calories = Math.round(655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age))
    } else {
      throw new Error('Invalid gender. Please specify "male" or "female".')
    }
    return calories
  }
  
const calculateDailyNutrition = (user) => {
  const age = calculateAge(user.dateOfBirth)
  const dailyCalorie = calculateCalories(user.gender, user.weight, user.height, age)
  const dailyProtein = Math.round(user.weight * 0.8)
  const dailyFat = Math.round(0.2 * dailyCalorie)
  const dailyCarbohydrate = Math.round((0.6 * dailyCalorie)/4)
  const dailySugar = 50

  return {
    dailyCalorie,
    dailyProtein, 
    dailyFat,
    dailyCarbohydrate, 
    dailySugar
  }
}

const calculateProgressNutrition = (user, nutritionLeft) => {
  const dailyNutrition = calculateDailyNutrition(user)
  const totalCalories = Math.round(dailyNutrition.dailyCalorie - nutritionLeft.dailyCalorie)
  const totalCarbohydrate = Math.round(dailyNutrition.dailyCarbohydrate - nutritionLeft.dailyCarbohydrate)
  const totalProtein = Math.round(dailyNutrition.dailyProtein - nutritionLeft.dailyProtein)
  const totalFat = Math.round(dailyNutrition.dailyFat - nutritionLeft.dailyFat)
  const totalSugar = Math.round(dailyNutrition.dailySugar - nutritionLeft.dailySugar)

  return {
    totalCalories,
    totalCarbohydrate,
    totalProtein,
    totalFat,
    totalSugar
  }
}

module.exports = { 
  calculateCalories, 
  calculateDailyNutrition,
  calculateProgressNutrition
}