import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">G</span>
              </div>
              <span className="text-white font-semibold">GolfCharity</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Play golf, win prizes, and give back — all in one platform.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white text-sm font-medium mb-3">Platform</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Home</Link>
              <Link to="/register" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Sign Up</Link>
              <Link to="/login" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Login</Link>
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white text-sm font-medium mb-3">Info</h4>
            <div className="flex flex-col gap-2">
              <span className="text-gray-500 text-sm">Monthly Draws</span>
              <span className="text-gray-500 text-sm">Charity Contributions</span>
              <span className="text-gray-500 text-sm">Score Tracking</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-600 text-xs">© {new Date().getFullYear()} GolfCharity. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}