import User from '../models/User.js'

// @POST /api/subscriptions/subscribe
export const subscribe = async (req, res) => {
  try {
    const { plan } = req.body

    if (!['monthly', 'yearly'].includes(plan)) {
      return res.status(400).json({ message: 'Invalid plan. Choose monthly or yearly.' })
    }

    const planAmounts = { monthly: 9.99, yearly: 99 }
    const amount = planAmounts[plan]

    const now = new Date()
    const endDate = new Date(now)
    if (plan === 'monthly') endDate.setMonth(endDate.getMonth() + 1)
    else endDate.setFullYear(endDate.getFullYear() + 1)

    const charityContribution = amount * 0.10

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        subscription: {
          plan,
          status: 'active',
          startDate: now,
          endDate,
          amount,
        },
        $inc: { charityContribution },
      },
      { new: true }
    ).select('-password')

    res.json({ message: 'Subscription activated', subscription: user.subscription })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @GET /api/subscriptions/status
export const getSubscriptionStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('subscription')
    res.json(user.subscription)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @PATCH /api/subscriptions/cancel
export const cancelSubscription = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { 'subscription.status': 'inactive' },
      { new: true }
    ).select('-password')

    res.json({ message: 'Subscription cancelled', subscription: user.subscription })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}