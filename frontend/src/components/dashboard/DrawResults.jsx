import { useState, useEffect } from 'react'
import { getMyResults } from '../../services/drawService'
import { getTierLabel, formatCurrency } from '../../utils/helpers'

export default function DrawResults() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMyResults()
      .then((res) => setResults(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-gray-500 text-sm">Loading draw results...</p>

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
      <h2 className="text-white font-semibold mb-5">My Draw Results</h2>

      {results.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-4xl mb-3">🎰</p>
          <p className="text-gray-500 text-sm">No draw results yet. Stay tuned for the next draw!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {results.map((r) => (
            <div key={r._id} className="bg-gray-800 rounded-xl p-5 border border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-medium">{r.draw?.month}</span>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  r.paymentStatus === 'approved'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : r.paymentStatus === 'rejected'
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {r.paymentStatus}
                </span>
              </div>
              <div className="text-emerald-400 font-semibold mb-2">{getTierLabel(r.tier)}</div>
              <div className="flex flex-wrap gap-2 mb-3">
                {r.matchedScores.map((s) => (
                  <span key={s} className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-1 rounded-lg font-mono">
                    {s}
                  </span>
                ))}
              </div>
              <div className="text-gray-400 text-sm">
                Prize: <span className="text-white font-medium">{formatCurrency(r.prizeAmount)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}