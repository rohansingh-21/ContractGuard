require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const authRoutes = require('./routes/auth')
const analyzeRoutes = require('./routes/analyze')
const historyRoutes = require('./routes/history')
const askRoutes = require('./routes/ask')

const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/analyze', analyzeRoutes)
app.use('/api/history', historyRoutes)
app.use('/api/ask', askRoutes)

app.get('/', (req, res) => res.json({ message: 'ContractGuard API running' }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
