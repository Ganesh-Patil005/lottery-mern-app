import mongoose from 'mongoose'

const drawSchema = new mongoose.Schema(
  {
    month: {
      type: String,
      required: true, // e.g. "2025-06"
    },
    numbers: {
      type: [Number],
      required: true, // 5 numbers between 1-45
    },
    status: {
      type: String,
      enum: ['pending', 'published'],
      default: 'pending',
    },
    prizePool: {
      type: Number,
      default: 0,
    },
    runBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    runAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

const Draw = mongoose.model('Draw', drawSchema)
export default Draw