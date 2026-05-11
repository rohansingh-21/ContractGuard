const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const { ask } = require('../controllers/askController')

router.post('/', protect, ask)

module.exports = router
