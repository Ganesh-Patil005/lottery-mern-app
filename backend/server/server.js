import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import connectDB from './config/db.js'

import authRoutes from './routes/authRoutes.js'
import scoreRoutes from './routes/scoreRoutes.js'
import drawRoutes from './routes/drawRoutes.js'
import charityRoutes from './routes/charityRoutes.js'
import subscriptionRoutes from './routes/subscriptionRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import errorHandler from './middleware/errorHandler.js'

dotenv.config()
connectDB()

const app = express()

// Middleware
app.use(helmet())
app.use(cors({
  origin: (origin, callback) => {
    const allowed = [
      process.env.CLIENT_URL,
      process.env.CLIENT_URL?.replace(/\/$/, ''), // without trailing slash
      'http://localhost:5173'
    ]
    if (!origin || allowed.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/scores', scoreRoutes)
app.use('/api/draws', drawRoutes)
app.use('/api/charities', charityRoutes)
app.use('/api/subscriptions', subscriptionRoutes)
app.use('/api/admin', adminRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

// Error Handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})