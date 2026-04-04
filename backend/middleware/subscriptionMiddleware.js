const subscribed = (req, res, next) => {
  if (
    req.user &&
    req.user.subscription &&
    req.user.subscription.status === 'active'
  ) {
    next()
  } else {
    res.status(403).json({ message: 'Active subscription required.' })
  }
}

export default subscribed