const express = require('express')
const foodController = require('../controllers/food-controller')
const router = express.Router()

router.route('/nutrition').post(foodController.textTracker)

router.route('/recommendation/:userId').get(foodController.getFoodRecommendation)


module.exports = router