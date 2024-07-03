const express = require('express')
const foodController = require('../controllers/food-controller')
const router = express.Router()

router  
    .route('/').post(foodController.foodTracker)

module.exports = router