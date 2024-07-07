const express = require('express')
const foodController = require('../controllers/food-controller')
const router = express.Router()

router  
    .route('/nutrition').post(foodController.foodTracker)


module.exports = router