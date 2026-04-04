export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  })
}

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD'
  }).format(amount)
}

export const getTierLabel = (tier) => {
  const map = {
    jackpot: '🏆 Jackpot',
    second: '🥈 Second Tier',
    third: '🥉 Third Tier',
  }
  return map[tier] || tier
}

export const getPlanLabel = (plan) => {
  return plan === 'yearly' ? 'Yearly Plan' : 'Monthly Plan'
}