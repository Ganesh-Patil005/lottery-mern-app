import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-white font-semibold text-lg">GolfCharity</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">Home</Link>
            {user && (
              <Link to="/dashboard" className="text-gray-400 hover:text-white text-sm transition-colors">Dashboard</Link>
            )}
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-gray-400 hover:text-white text-sm transition-colors">Admin</Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm">Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-gray-800 hover:bg-gray-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-gray-400 hover:text-white text-sm transition-colors">Login</Link>
                <Link to="/register" className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm px-4 py-2 rounded-lg transition-colors">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-800 py-4 flex flex-col gap-3">
            <Link to="/" className="text-gray-400 hover:text-white text-sm" onClick={() => setMenuOpen(false)}>Home</Link>
            {user && (
              <Link to="/dashboard" className="text-gray-400 hover:text-white text-sm" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            )}
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-gray-400 hover:text-white text-sm" onClick={() => setMenuOpen(false)}>Admin</Link>
            )}
            {user ? (
              <button onClick={handleLogout} className="text-left text-red-400 hover:text-red-300 text-sm">Logout</button>
            ) : (
              <>
                <Link to="/login" className="text-gray-400 hover:text-white text-sm" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" className="text-emerald-400 hover:text-emerald-300 text-sm" onClick={() => setMenuOpen(false)}>Get Started</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}