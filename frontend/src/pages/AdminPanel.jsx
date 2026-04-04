import { useState } from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import UserTable from '../components/admin/UserTable'
import DrawManager from '../components/admin/DrawManager'
import CharityManager from '../components/admin/CharityManager'
import Analytics from '../components/admin/Analytics'

const tabs = ['Analytics', 'Users', 'Draws', 'Charities']

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('Analytics')

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-purple-500/20 border border-purple-500/30 rounded-lg flex items-center justify-center">
            <span className="text-purple-400 text-sm">⚙</span>
          </div>
          <h1 className="text-white text-2xl font-bold">Admin Panel</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-900 border border-gray-800 rounded-xl p-1 mb-8 w-fit flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-purple-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Analytics' && <Analytics />}
        {activeTab === 'Users' && <UserTable />}
        {activeTab === 'Draws' && <DrawManager />}
        {activeTab === 'Charities' && <CharityManager />}
      </main>

      <Footer />
    </div>
  )
}