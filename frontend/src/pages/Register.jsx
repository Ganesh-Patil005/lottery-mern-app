import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { registerUser } from '../services/authService'
import { getCharities } from '../services/charityService'

const plans = [
  { id: 'monthly', label: 'Monthly', price: '$9.99/mo', desc: 'Billed every month' },
  { id: 'yearly', label: 'Yearly', price: '$99/yr', desc: 'Save 17% annually' },
]

export default function Register() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [charities, setCharities] = useState([])
  const [form, setForm] = useState({
    name: '', email: '', password: '', charity: '', plan: 'monthly'
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getCharities()
      .then((res) => setCharities(res.data))
      .catch(() => {})
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await registerUser(form)
      login(res.data.user, res.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">G</span>
            </div>
            <span className="text-white font-semibold text-xl">GolfCharity</span>
          </Link>
          <h1 className="text-white text-2xl font-bold mt-6 mb-1">Create your account</h1>
          <p className="text-gray-500 text-sm">Start playing for a purpose</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Name */}
            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Plan */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Choose Plan</label>
              <div className="grid grid-cols-2 gap-3">
                {plans.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setForm({ ...form, plan: p.id })}
                    className={`border rounded-xl p-4 text-left transition-colors ${
                      form.plan === p.id
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                    }`}
                  >
                    <div className="text-white text-sm font-medium">{p.label}</div>
                    <div className="text-emerald-400 text-sm font-bold mt-0.5">{p.price}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{p.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Charity */}
            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">Select Charity</label>
              <select
                name="charity"
                value={form.charity}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              >
                <option value="">-- Choose a charity --</option>
                {charities.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-medium py-3 rounded-xl transition-colors mt-1"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-400 hover:text-emerald-300 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}