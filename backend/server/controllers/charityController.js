import Charity from '../models/Charity.js'

// @GET /api/charities
export const getCharities = async (req, res) => {
  try {
    const charities = await Charity.find({ isActive: true })
    res.json(charities)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @POST /api/charities (admin)
export const createCharity = async (req, res) => {
  try {
    const { name, description, logoUrl } = req.body

    if (!name) {
      return res.status(400).json({ message: 'Charity name is required' })
    }

    const charity = await Charity.create({ name, description, logoUrl })
    res.status(201).json(charity)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @PATCH /api/charities/:id (admin)
export const updateCharity = async (req, res) => {
  try {
    const charity = await Charity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!charity) {
      return res.status(404).json({ message: 'Charity not found' })
    }

    res.json(charity)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}