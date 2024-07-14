const express = require('express')
const profileController = require('../controllers/profile-controller')
const validate = require('../middlewares/validate')
const profileValidation = require('../validations/profile-validation')
const router = express.Router()

router  
    .route('/').post(validate(profileValidation.createProfile), profileController.createProfile)

router
    .route('/:userId').get(profileController.getProfileById).patch(profileController.updateProfile)

router  
    .route('/nutrition/:userId').get(profileController.getTotalNutrition)

router
    .route('/nutrition/progress/:userId').get(profileController.getProgressNutrition)

module.exports = router