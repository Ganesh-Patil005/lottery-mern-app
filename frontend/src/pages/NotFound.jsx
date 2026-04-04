import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-8xl font-bold text-gray-800 mb-4">404</p>
        <h1 className="text-white text-2xl font-bold mb-2">Page not found</h1>
        <p className="text-gray-500 text-sm mb-8">The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6 py-3 rounded-xl transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}