import { useNavigate } from "react-router-dom"

function Home() {

  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-gray-800 text-white flex items-center justify-center">

      <div className="max-w-4xl text-center px-6">

        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
           TradeApp
        </h1>

        <p className="text-xl text-gray-300 mb-10">
          A modern stock portfolio management platform built with MERN Stack.
        </p>

        {/* FEATURES */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">

          <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700 p-5 rounded-xl">
             Portfolio Tracking
          </div>

          <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700 p-5 rounded-xl">
             Watchlist Management
          </div>

          <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700 p-5 rounded-xl">
             Price Simulation
          </div>

          <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700 p-5 rounded-xl">
             Transaction History & CSV Export
          </div>

        </div>

        {/* START BUTTON */}
        <button
          onClick={() => navigate("/login")}
          className="bg-gradient-to-r from-cyan-500 to-green-500 px-8 py-4 rounded-xl text-lg font-semibold hover:scale-105 transition shadow-xl"
        >
           Get Started
        </button>

      </div>

    </div>
  )
}

export default Home
