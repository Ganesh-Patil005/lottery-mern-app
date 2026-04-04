import { useEffect, useState } from 'react'
import api from '../../services/api'
import { formatDate } from '../../utils/helpers'

export default function UserTable() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    api.get('/admin/users').then((res) => setUsers(res.data)).catch(() => {})
  }, [])

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-white font-semibold">All Users</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-gray-500 font-medium px-6 py-3">Name</th>
              <th className="text-left text-gray-500 font-medium px-6 py-3">Email</th>
              <th className="text-left text-gray-500 font-medium px-6 py-3">Plan</th>
              <th className="text-left text-gray-500 font-medium px-6 py-3">Status</th>
              <th className="text-left text-gray-500 font-medium px-6 py-3">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                <td className="px-6 py-4 text-white">{u.name}</td>
                <td className="px-6 py-4 text-gray-400">{u.email}</td>
                <td className="px-6 py-4 text-gray-400 capitalize">{u.subscription?.plan || '—'}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    u.subscription?.status === 'active'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {u.subscription?.status || 'inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400">{formatDate(u.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-10">No users found.</p>
        )}
      </div>
    </div>
  )
}