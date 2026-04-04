import mongoose from 'mongoose'

const charitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Charity name is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    logoUrl: {
      type: String,
      default: '',
    },
    totalReceived: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

const Charity = mongoose.model('Charity', charitySchema)
export default Charity