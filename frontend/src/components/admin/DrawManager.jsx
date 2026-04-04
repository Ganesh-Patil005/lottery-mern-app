import { useEffect, useState } from 'react'
import { getDraws, runDraw, publishDraw } from '../../services/drawService'

export default function DrawManager() {
  const [draws, setDraws] = useState([])
  const [running, setRunning] = useState(false)

  const fetchDraws = () => {
    getDraws().then((res) => setDraws(res.data)).catch(() => {})
  }

  useEffect(() => { fetchDraws() }, [])

  const handleRun = async () => {
    setRunning(true)
    try {
      await runDraw()
      fetchDraws()
    } catch {}
    finally { setRunning(false) }
  }

  const handlePublish = async (id) => {
    try {
      await publishDraw(id)
      fetchDraws()
    } catch {}
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-2">Run Monthly Draw</h2>
        <p className="text-gray-500 text-sm mb-5">Generate 5 random numbers and match against all active users' scores.</p>
        <button
          onClick={handleRun}
          disabled={running}
          className="bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-white font-medium px-6 py-3 rounded-xl transition-colors"
        >
          {running ? 'Running Draw...' : '🎰 Run Draw'}
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-white font-semibold">Draw History</h2>
        </div>
        <div className="flex flex-col divide-y divide-gray-800">
          {draws.length === 0 && (
            <p className="text-gray-500 text-sm text-center py-10">No draws yet.</p>
          )}
          {draws.map((d) => (
            <div key={d._id} className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="text-white text-sm font-medium">{d.month}</p>
                <div className="flex gap-1.5 mt-1.5">
                  {d.numbers.map((n) => (
                    <span key={n} className="bg-purple-500/20 text-purple-400 text-xs px-2 py-0.5 rounded font-mono">{n}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-3 py-1 rounded-full ${
                  d.status === 'published'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {d.status}
                </span>
                {d.status === 'pending' && (
                  <button
                    onClick={() => handlePublish(d._id)}
                    className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Publish
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}