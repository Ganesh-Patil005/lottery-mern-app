import express from 'express'
import {
  getUsers,
  getAnalytics,
  verifyWinner,
} from '../controllers/adminController.js'
import protect from '../middleware/authMiddleware.js'
import adminOnly from '../middleware/adminMiddleware.js'

const router = express.Router()

router.get('/users', protect, adminOnly, getUsers)
router.get('/analytics', protect, adminOnly, getAnalytics)
router.patch('/winners/:id/verify', protect, adminOnly, verifyWinner)

export default router