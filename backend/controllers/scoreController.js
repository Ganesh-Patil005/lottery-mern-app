import Score from '../models/Score.js'

// @GET /api/scores
export const getScores = async (req, res) => {
  try {
    const scores = await Score.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(5)

    res.json(scores)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @POST /api/scores
export const addScore = async (req, res) => {
  try {
    const { score, date } = req.body

    if (!score || !date) {
      return res.status(400).json({ message: 'Score and date are required' })
    }

    if (score < 1 || score > 45) {
      return res.status(400).json({ message: 'Score must be between 1 and 45' })
    }

    // Check if user already has 5 scores
    const existing = await Score.find({ user: req.user._id }).sort({ createdAt: 1 })

    if (existing.length >= 5) {
      // Delete the oldest score
      await Score.findByIdAndDelete(existing[0]._id)
    }

    const newScore = await Score.create({
      user: req.user._id,
      score,
      date,
    })

    res.status(201).json(newScore)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}