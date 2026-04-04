import { useEffect, useState } from 'react'
import { getCharities, createCharity } from '../../services/charityService'

export default function CharityManager() {
  const [charities, setCharities] = useState([])
  const [form, setForm] = useState({ name: '', description: '' })
  const [loading, setLoading] = useState(false)

  const fetchCharities = () => {
    getCharities().then((res) => setCharities(res.data)).catch(() => {})
  }

  useEffect(() => { fetchCharities() }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await createCharity(form)
      setForm({ name: '', description: '' })
      fetchCharities()
    } catch {}
    finally { setLoading(false) }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Add Charity */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-5">Add Charity</h2>
        <form onSubmit={handleAdd} className="flex flex-col gap-4">
          <div>
            <label className="text-gray-400 text-sm mb-1.5 block">Charity Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              placeholder="e.g. Red Cross"
              className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1.5 block">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              placeholder="Brief description..."
              className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-white font-medium py-3 rounded-xl transition-colors"
          >
            {loading ? 'Adding...' : 'Add Charity'}
          </button>
        </form>
      </div>

      {/* Charity List */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-5">All Charities</h2>
        <div className="flex flex-col gap-3">
          {charities.length === 0 && (
            <p className="text-gray-500 text-sm">No charities added yet.</p>
          )}
          {charities.map((c) => (
            <div key={c._id} className="bg-gray-800 rounded-xl px-4 py-3">
              <p className="text-white text-sm font-medium">{c.name}</p>
              <p className="text-gray-500 text-xs mt-0.5">{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}