import Draw from '../models/Draw.js'
import Winner from '../models/Winner.js'
import Score from '../models/Score.js'
import User from '../models/User.js'
import {
  generateUniqueRandom,
  getCurrentMonth,
  calculatePrizes,
  getTier,
} from '../utils/drawUtils.js'

// @GET /api/draws
export const getDraws = async (req, res) => {
  try {
    const draws = await Draw.find({ status: 'published' }).sort({ createdAt: -1 })
    res.json(draws)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @GET /api/draws/my-results
export const getMyResults = async (req, res) => {
  try {
    const results = await Winner.find({ user: req.user._id })
      .populate('draw')
      .sort({ createdAt: -1 })

    res.json(results)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @POST /api/draws/run (admin)
export const runDraw = async (req, res) => {
  try {
    const month = getCurrentMonth()

    // Prevent duplicate draws for same month
    const existing = await Draw.findOne({ month })
    if (existing) {
      return res.status(400).json({ message: `Draw for ${month} already exists` })
    }

    // Generate 5 unique random numbers
    const numbers = generateUniqueRandom(5, 1, 45)

    // Get all active subscribers
    const activeUsers = await User.find({ 'subscription.status': 'active' })

    // Calculate prize pool
    const prizePool = activeUsers.reduce((sum, u) => {
      return sum + (u.subscription?.amount || 0)
    }, 0)

    // Create the draw
    const draw = await Draw.create({
      month,
      numbers,
      prizePool,
      runBy: req.user._id,
    })

    // Find winners
    const potentialWinners = []

    for (const user of activeUsers) {
      const scores = await Score.find({ user: user._id })
      const userScoreValues = scores.map((s) => s.score)

      const matched = numbers.filter((n) => userScoreValues.includes(n))
      const tier = getTier(matched.length)

      if (tier) {
        potentialWinners.push({
          draw: draw._id,
          user: user._id,
          matchedScores: matched,
          tier,
        })
      }
    }

    // Calculate prize amounts
    const winnersWithPrizes = calculatePrizes(prizePool, potentialWinners)

    // Save winners
    if (winnersWithPrizes.length > 0) {
      await Winner.insertMany(winnersWithPrizes)
    }

    res.status(201).json({
      message: 'Draw completed',
      draw,
      totalWinners: winnersWithPrizes.length,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @PATCH /api/draws/:id/publish (admin)
export const publishDraw = async (req, res) => {
  try {
    const draw = await Draw.findByIdAndUpdate(
      req.params.id,
      { status: 'published' },
      { new: true }
    )

    if (!draw) {
      return res.status(404).json({ message: 'Draw not found' })
    }

    res.json({ message: 'Draw published', draw })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}