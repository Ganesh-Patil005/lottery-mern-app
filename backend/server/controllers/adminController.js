import User from '../models/User.js'
import Winner from '../models/Winner.js'
import Charity from '../models/Charity.js'
import Draw from '../models/Draw.js'

// @GET /api/admin/users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').populate('charity')
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @GET /api/admin/analytics
export const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    const activeSubscribers = await User.countDocuments({ 'subscription.status': 'active' })

    const activeUsers = await User.find({ 'subscription.status': 'active' })
    const prizePool = activeUsers.reduce((sum, u) => sum + (u.subscription?.amount || 0), 0)

    const charities = await Charity.find()
    const charityTotal = charities.reduce((sum, c) => sum + (c.totalReceived || 0), 0)

    res.json({
      totalUsers,
      activeSubscribers,
      prizePool: Math.round(prizePool * 100) / 100,
      charityTotal: Math.round(charityTotal * 100) / 100,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @PATCH /api/admin/winners/:id/verify
export const verifyWinner = async (req, res) => {
  try {
    const { paymentStatus, proofUrl } = req.body

    if (!['approved', 'rejected'].includes(paymentStatus)) {
      return res.status(400).json({ message: 'Invalid payment status' })
    }

    const winner = await Winner.findByIdAndUpdate(
      req.params.id,
      {
        paymentStatus,
        proofUrl: proofUrl || '',
        verifiedAt: new Date(),
      },
      { new: true }
    ).populate('user draw')

    if (!winner) {
      return res.status(404).json({ message: 'Winner not found' })
    }

    res.json({ message: `Winner ${paymentStatus}`, winner })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}