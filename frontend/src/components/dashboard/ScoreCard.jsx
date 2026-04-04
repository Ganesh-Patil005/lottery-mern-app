import { useState, useEffect } from 'react'
import { getScores, addScore } from '../../services/scoreService'
import { formatDate } from '../../utils/helpers'

export default function ScoreCard() {
  const [scores, setScores] = useState([])
  const [score, setScore] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchScores = async () => {
    try {
      const res = await getScores()
      setScores(res.data)
    } catch {}
  }

  useEffect(() => { fetchScores() }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    setError('')
    if (score < 1 || score > 45) return setError('Score must be between 1 and 45.')
    setLoading(true)
    try {
      await addScore({ score: Number(score), date })
      setScore('')
      setDate('')
      fetchScores()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add score.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Add Score */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-5">Add Score</h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleAdd} className="flex flex-col gap-4">
          <div>
            <label className="text-gray-400 text-sm mb-1.5 block">Golf Score (1–45)</label>
            <input
              type="number"
              min={1}
              max={45}
              value={score}
              onChange={(e) => setScore(e.target.value)}
              required
              placeholder="e.g. 23"
              className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-1.5 block">Date Played</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-medium py-3 rounded-xl transition-colors"
          >
            {loading ? 'Adding...' : 'Add Score'}
          </button>
        </form>
      </div>

      {/* Score History */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-5">Your Last 5 Scores</h2>

        {scores.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-4xl mb-3">⛳</p>
            <p className="text-gray-500 text-sm">No scores yet. Add your first score!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {scores.map((s, i) => (
              <div key={s._id} className="flex items-center justify-between bg-gray-800 rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 text-xs w-4">{i + 1}</span>
                  <span className="text-white font-bold text-lg">{s.score}</span>
                </div>
                <span className="text-gray-500 text-sm">{formatDate(s.date)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}