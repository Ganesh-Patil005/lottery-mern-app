import { useState, useEffect } from 'react'
import { getSubscriptionStatus, cancelSubscription } from '../../services/subscriptionService'
import { formatDate, formatCurrency, getPlanLabel } from '../../utils/helpers'

export default function SubscriptionStatus() {
  const [sub, setSub] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState(false)

  useEffect(() => {
    getSubscriptionStatus()
      .then((res) => setSub(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel your subscription?')) return
    setCancelling(true)
    try {
      await cancelSubscription()
      setSub((prev) => ({ ...prev, status: 'inactive' }))
    } catch {}
    finally { setCancelling(false) }
  }

  if (loading) return <p className="text-gray-500 text-sm">Loading subscription...</p>

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-lg">
      <h2 className="text-white font-semibold mb-5">Subscription</h2>

      {!sub || sub.status === 'inactive' ? (
        <div className="text-center py-10">
          <p className="text-4xl mb-3">💳</p>
          <p className="text-gray-400 text-sm mb-4">You don't have an active subscription.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between bg-gray-800 rounded-xl px-4 py-3">
            <span className="text-gray-400 text-sm">Status</span>
            <span className="bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full font-medium">Active</span>
          </div>
          <div className="flex items-center justify-between bg-gray-800 rounded-xl px-4 py-3">
            <span className="text-gray-400 text-sm">Plan</span>
            <span className="text-white text-sm">{getPlanLabel(sub.plan)}</span>
          </div>
          <div className="flex items-center justify-between bg-gray-800 rounded-xl px-4 py-3">
            <span className="text-gray-400 text-sm">Amount</span>
            <span className="text-white text-sm">{formatCurrency(sub.amount)}</span>
          </div>
          <div className="flex items-center justify-between bg-gray-800 rounded-xl px-4 py-3">
            <span className="text-gray-400 text-sm">Renewal</span>
            <span className="text-white text-sm">{formatDate(sub.endDate)}</span>
          </div>

          <button
            onClick={handleCancel}
            disabled={cancelling}
            className="mt-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-sm font-medium py-3 rounded-xl transition-colors disabled:opacity-50"
          >
            {cancelling ? 'Cancelling...' : 'Cancel Subscription'}
          </button>
        </div>
      )}
    </div>
  )
}