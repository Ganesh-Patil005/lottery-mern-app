import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

const features = [
  {
    icon: '⛳',
    title: 'Track Your Scores',
    desc: 'Log your latest 5 golf scores and stay in the running for every monthly draw.',
  },
  {
    icon: '🎰',
    title: 'Monthly Draws',
    desc: 'Five random numbers drawn each month. Match 3, 4, or all 5 to win prizes.',
  },
  {
    icon: '❤️',
    title: 'Give Back',
    desc: 'A portion of every subscription automatically goes to your chosen charity.',
  },
  {
    icon: '💰',
    title: 'Win Real Prizes',
    desc: 'Prize pool grows with every subscriber. Jackpot winners take 40% of the pool.',
  },
]

const steps = [
  { step: '01', title: 'Sign Up', desc: 'Create your account and choose a charity you care about.' },
  { step: '02', title: 'Subscribe', desc: 'Pick a monthly or yearly plan to unlock all features.' },
  { step: '03', title: 'Enter Scores', desc: 'Add your golf scores (1–45) before each monthly draw.' },
  { step: '04', title: 'Win & Give', desc: 'Match draw numbers to win prizes while your charity benefits.' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          Monthly draws now live
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight max-w-3xl mb-6">
          Golf. Win. <span className="text-emerald-400">Give Back.</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mb-10 leading-relaxed">
          Subscribe, track your golf scores, compete in monthly draws, and automatically contribute to a charity you love.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/register"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-8 py-3 rounded-xl transition-colors"
          >
            Get Started Free
          </Link>
          <Link
            to="/login"
            className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-8 py-3 rounded-xl transition-colors"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
            Everything in one place
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-emerald-500/40 transition-colors">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
            How it works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {steps.map((s) => (
              <div key={s.step} className="flex gap-4 bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <span className="text-emerald-400 font-bold text-lg shrink-0">{s.step}</span>
                <div>
                  <h3 className="text-white font-semibold mb-1">{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 bg-emerald-500">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to play for a purpose?
          </h2>
          <p className="text-emerald-100 mb-8">
            Join hundreds of golfers making every round count.
          </p>
          <Link
            to="/register"
            className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-8 py-3 rounded-xl transition-colors inline-block"
          >
            Create Your Account
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}