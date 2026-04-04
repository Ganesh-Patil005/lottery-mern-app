import mongoose from 'mongoose'

const scoreSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: [1, 'Score must be at least 1'],
      max: [45, 'Score must be at most 45'],
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
)

const Score = mongoose.model('Score', scoreSchema)
export default Score