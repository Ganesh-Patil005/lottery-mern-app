import express from 'express'
import {
  getCharities,
  createCharity,
  updateCharity,
} from '../controllers/charityController.js'
import protect from '../middleware/authMiddleware.js'
import adminOnly from '../middleware/adminMiddleware.js'

const router = express.Router()

router.get('/', getCharities)
router.post('/', protect, adminOnly, createCharity)
router.patch('/:id', protect, adminOnly, updateCharity)

export default router