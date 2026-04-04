import { useEffect, useState } from 'react'
import { getMe } from '../../services/authService'
import { formatCurrency } from '../../utils/helpers'

export default function CharityInfo() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    getMe().then((res) => setUser(res.data)).catch(() => {})
  }, [])

  if (!user) return <p className="text-gray-500 text-sm">Loading charity info...</p>

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-lg">
      <h2 className="text-white font-semibold mb-5">Your Charity</h2>

      {!user.charity ? (
        <p className="text-gray-500 text-sm">No charity selected.</p>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5">
            <p className="text-emerald-400 font-semibold text-lg mb-1">{user.charity.name}</p>
            <p className="text-gray-400 text-sm">{user.charity.description}</p>
          </div>

          <div className="flex items-center justify-between bg-gray-800 rounded-xl px-4 py-3">
            <span className="text-gray-400 text-sm">Your Total Contribution</span>
            <span className="text-emerald-400 font-semibold">{formatCurrency(user.charityContribution || 0)}</span>
          </div>

          <p className="text-gray-600 text-xs">
            A minimum of 10% of your subscription goes directly to this charity every billing cycle.
          </p>
        </div>
      )}
    </div>
  )
}