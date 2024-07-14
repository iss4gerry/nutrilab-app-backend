const express = require('express')
const foodController = require('../controllers/food-controller')
const validate = require('../middlewares/validate')
const foodValidation = require('../validations/food-validation')
const router = express.Router()

router.route('/nutrition').post(validate(foodValidation.textTracker), foodController.textTracker)

router.route('/recommendation/:userId').get(validate(foodValidation.getFoodRecommendation), foodController.getFoodRecommendation)


module.exports = router