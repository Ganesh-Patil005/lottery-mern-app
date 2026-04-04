import express from 'express'
import {
  subscribe,
  getSubscriptionStatus,
  cancelSubscription,
} from '../controllers/subscriptionController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/subscribe', protect, subscribe)
router.get('/status', protect, getSubscriptionStatus)
router.patch('/cancel', protect, cancelSubscription)

export default router