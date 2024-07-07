const express = require('express')
const profileController = require('../controllers/profile-controller')
const router = express.Router()

router  
    .route('/').post(profileController.createProfile)

module.exports = router