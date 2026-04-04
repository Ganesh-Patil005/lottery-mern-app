import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })
}

// @POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { name, email, password, charity, plan } = req.body

    if (!name || !email || !password || !charity || !plan) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    const planAmounts = { monthly: 9.99, yearly: 99 }
    const amount = planAmounts[plan]

    const now = new Date()
    const endDate = new Date(now)
    if (plan === 'monthly') endDate.setMonth(endDate.getMonth() + 1)
    else endDate.setFullYear(endDate.getFullYear() + 1)

    const charityContribution = amount * 0.10

    const user = await User.create({
      name,
      email,
      password,
      charity,
      charityContribution,
      subscription: {
        plan,
        status: 'active',
        startDate: now,
        endDate,
        amount,
      },
    })

    const token = generateToken(user._id)

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        subscription: user.subscription,
        charity: user.charity,
      },
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = await User.findOne({ email }).populate('charity')
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = generateToken(user._id)

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        subscription: user.subscription,
        charity: user.charity,
      },
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('charity')

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}