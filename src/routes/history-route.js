const express = require('express')
const historyController = require('../controllers/history-controller')
const validate = require('../middlewares/validate')
const historyValidation = require('../validations/history-validation')
const router = express.Router()

router.route('/').get(historyController.getAllHistory)
router.route('/:userId').get(validate(historyValidation.getUserHistory), historyController.getUserHistory)

module.exports = router