import { useEffect, useState } from 'react'
import api from '../../services/api'
import { formatCurrency } from '../../utils/helpers'

export default function Analytics() {
  const [data, setData] = useState(null)

  useEffect(() => {
    api.get('/admin/analytics').then((res) => setData(res.data)).catch(() => {})
  }, [])

  const stats = [
    { label: 'Total Users', value: data?.totalUsers ?? '—', icon: '👤' },
    { label: 'Active Subscribers', value: data?.activeSubscribers ?? '—', icon: '✅' },
    { label: 'Total Prize Pool', value: data ? formatCurrency(data.prizePool) : '—', icon: '💰' },
    { label: 'Charity Contributions', value: data ? formatCurrency(data.charityTotal) : '—', icon: '❤️' },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((s) => (
        <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="text-2xl mb-3">{s.icon}</div>
          <div className="text-white text-2xl font-bold mb-1">{s.value}</div>
          <div className="text-gray-500 text-sm">{s.label}</div>
        </div>
      ))}
    </div>
  )
}