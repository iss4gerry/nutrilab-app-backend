const express = require('express')
const historyController = require('../controllers/history-controller')
const router = express.Router()

router.route('/').get(historyController.getAllHistory)
router.route('/:userId').get(historyController.getUserHistory)

module.exports = router