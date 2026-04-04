import express from 'express'
import {
  getDraws,
  getMyResults,
  runDraw,
  publishDraw,
} from '../controllers/drawController.js'
import protect from '../middleware/authMiddleware.js'
import adminOnly from '../middleware/adminMiddleware.js'

const router = express.Router()

router.get('/', getDraws)
router.get('/my-results', protect, getMyResults)
router.post('/run', protect, adminOnly, runDraw)
router.patch('/:id/publish', protect, adminOnly, publishDraw)

export default router