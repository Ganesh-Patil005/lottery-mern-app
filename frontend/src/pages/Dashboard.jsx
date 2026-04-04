import { useState } from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import SubscriptionStatus from '../components/dashboard/SubscriptionStatus'
import ScoreCard from '../components/dashboard/ScoreCard'
import DrawResults from '../components/dashboard/DrawResults'
import CharityInfo from '../components/dashboard/CharityInfo'

const tabs = ['Scores', 'Draws', 'Subscription', 'Charity']

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Scores')

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-10">
        <h1 className="text-white text-2xl font-bold mb-8">My Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-900 border border-gray-800 rounded-xl p-1 mb-8 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-emerald-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'Scores' && <ScoreCard />}
        {activeTab === 'Draws' && <DrawResults />}
        {activeTab === 'Subscription' && <SubscriptionStatus />}
        {activeTab === 'Charity' && <CharityInfo />}
      </main>

      <Footer />
    </div>
  )
}