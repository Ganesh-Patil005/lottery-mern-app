import express from 'express'
import { getScores, addScore } from '../controllers/scoreController.js'
import protect from '../middleware/authMiddleware.js'
import subscribed from '../middleware/subscriptionMiddleware.js'

const router = express.Router()

router.get('/', protect, getScores)
router.post('/', protect, subscribed, addScore)

export default router