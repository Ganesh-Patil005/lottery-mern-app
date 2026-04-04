import mongoose from 'mongoose'

const winnerSchema = new mongoose.Schema(
  {
    draw: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Draw',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    matchedScores: {
      type: [Number],
      required: true,
    },
    tier: {
      type: String,
      enum: ['jackpot', 'second', 'third'],
      required: true,
    },
    prizeAmount: {
      type: Number,
      default: 0,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    proofUrl: {
      type: String,
      default: '',
    },
    verifiedAt: {
      type: Date,
    },
  },
  { timestamps: true }
)

const Winner = mongoose.model('Winner', winnerSchema)
export default Winner