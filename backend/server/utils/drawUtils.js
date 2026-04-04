// Generate N unique random numbers between min and max (inclusive)
export const generateUniqueRandom = (count, min, max) => {
  const numbers = new Set()
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * (max - min + 1)) + min)
  }
  return Array.from(numbers)
}

// Get current month string e.g. "2025-06"
export const getCurrentMonth = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
}

// Calculate prize distribution
export const calculatePrizes = (prizePool, winners) => {
  const charityShare = prizePool * 0.10
  const remaining = prizePool - charityShare

  const jackpotPool = remaining * 0.40
  const secondPool = remaining * 0.35
  const thirdPool = remaining * 0.25

  const jackpotWinners = winners.filter((w) => w.tier === 'jackpot')
  const secondWinners = winners.filter((w) => w.tier === 'second')
  const thirdWinners = winners.filter((w) => w.tier === 'third')

  return winners.map((w) => {
    let prize = 0
    if (w.tier === 'jackpot') {
      prize = jackpotWinners.length > 0 ? jackpotPool / jackpotWinners.length : 0
    } else if (w.tier === 'second') {
      prize = secondWinners.length > 0 ? secondPool / secondWinners.length : 0
    } else if (w.tier === 'third') {
      prize = thirdWinners.length > 0 ? thirdPool / thirdWinners.length : 0
    }
    return { ...w, prizeAmount: Math.round(prize * 100) / 100 }
  })
}

// Determine tier from match count
export const getTier = (matchCount) => {
  if (matchCount === 5) return 'jackpot'
  if (matchCount === 4) return 'second'
  if (matchCount === 3) return 'third'
  return null
}