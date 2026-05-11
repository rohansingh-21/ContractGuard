const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const upload = require('../middleware/upload')
const { analyzeDocument } = require('../controllers/analyzeController')

router.post('/', protect, upload.single('file'), analyzeDocument)

module.exports = router
