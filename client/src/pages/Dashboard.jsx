import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js"

import { Line } from "react-chartjs-2"

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend)

function Dashboard() {

  const [stocks, setStocks] = useState([])
  const [transactions, setTransactions] = useState([])
  const [total, setTotal] = useState(0)
  const [investment, setInvestment] = useState(0)
  const [history, setHistory] = useState([])

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")

  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const handleLogout = () => {
    localStorage.clear()
    navigate("/login")
    toast.success("Logged out successfully 👋")
  }

  // FETCH HISTORY
  const fetchHistory = () => {
    axios.get("http://localhost:5000/api/history", {
      headers: { Authorization: "Bearer " + token }
    })
    .then(res => {
      const values = res.data.map(item => item.value)
      setHistory(values)
    })
    .catch(() => toast.error("Failed to load history ❌"))
  }

  // FETCH STOCKS
  const fetchStocks = () => {
    axios.get("http://localhost:5000/api/stocks", {
      headers: { Authorization: "Bearer " + token }
    })
    .then(res => {
      setStocks(res.data)

      let sum = 0
      let invested = 0

      res.data.forEach(stock => {
        sum += stock.price * stock.quantity
        invested += (stock.buyPrice || stock.price) * stock.quantity
      })

      setTotal(sum)
      setInvestment(invested)

      axios.post("http://localhost:5000/api/history/add", {
        value: sum
      }).then(() => fetchHistory())

    })
    .catch(() => toast.error("Failed to load stocks ❌"))
  }

  // FETCH TRANSACTIONS
  const fetchTransactions = () => {
    axios.get("http://localhost:5000/api/stocks/transactions", {
      headers: { Authorization: "Bearer " + token }
    })
    .then(res => setTransactions(res.data))
    .catch(() => toast.error("Failed to load transactions ❌"))
  }

  // PROTECT DASHBOARD
  useEffect(() => {
    if (!token) {
      navigate("/login")
    } else {
      fetchStocks()
      fetchTransactions()
    }
  }, [])

  // ADD STOCK
  const addStock = () => {
  if (!name || !price || !quantity) {
    toast.warning("Fill all fields ⚠️")
    return
  }

  if (price <= 0 || quantity <= 0) {
    toast.error("Invalid values ❌")
    return
  }

  toast.info("Adding stock... ⏳")

  axios.post("http://localhost:5000/api/stocks/add", {
    name, price, quantity
  }, {
    headers: { Authorization: "Bearer " + token }
  })
  .then(() => {
    fetchStocks()
    fetchTransactions()
    toast.success(`Stock added successfully ✅`)
  })
  .catch(() => toast.error("Add failed ❌"))
}

  // BUY
const buyStock = (id) => {
  toast.info("Processing buy... ⏳")

  axios.post("http://localhost:5000/api/stocks/buy", {
    id, quantity: 1
  }, {
    headers: { Authorization: "Bearer " + token }
  })
  .then(() => {
    fetchStocks()
    fetchTransactions()
    toast.success("Stock bought successfully 📈")
  })
  .catch(() => toast.error("Buy failed ❌"))
}

  // SELL
const sellStock = (id) => {
  toast.info("Processing sell... ⏳")

  axios.post("http://localhost:5000/api/stocks/sell", {
    id, quantity: 1
  }, {
    headers: { Authorization: "Bearer " + token }
  })
  .then(() => {
    fetchStocks()
    fetchTransactions()
    toast.success("Stock sold successfully 📉")
  })
  .catch(() => toast.error("Sell failed ❌"))
}

  // CHART DATA
  const chartData = {
    labels: history.map((_, i) => "T" + (i + 1)),
    datasets: [
      {
        label: "Portfolio Value",
        data: history,
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.2)",
        tension: 0.4,
        fill: true
      }
    ]
  }

 return (
  <div className="min-h-screen text-white flex justify-center pt-4">

    <div className="w-full max-w-6xl px-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 bg-slate-800/60 backdrop-blur-md border border-slate-700 p-5 rounded-2xl shadow-xl">

        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
           Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-500 to-red-700 px-5 py-2 rounded-xl hover:scale-105 transition shadow-lg"
        >
          Logout
        </button>

      </div>

      {/* STATS CARDS */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">

        {/* TOTAL VALUE */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-700 p-6 rounded-2xl text-center shadow-xl">

          <h2 className="text-lg text-green-100">
            Total Portfolio Value
          </h2>

          <p className="text-4xl font-bold mt-2">
            ₹{total}
          </p>

        </div>

        {/* PROFIT / LOSS */}
        <div
          className={`p-6 rounded-2xl text-center shadow-xl ${
            total - investment >= 0
              ? "bg-gradient-to-r from-cyan-600 to-green-600"
              : "bg-gradient-to-r from-red-600 to-red-800"
          }`}
        >

          <h2 className="text-lg">
            Profit / Loss
          </h2>

          <p className="text-4xl font-bold mt-2">
            ₹{total - investment}
          </p>

        </div>

      </div>

      {/* CHART CARD */}
      <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700 p-6 rounded-2xl shadow-xl">

        <h2 className="text-center mb-6 text-xl font-semibold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
           Portfolio Growth
        </h2>

        <Line data={chartData} />

      </div>

    </div>

  </div>
)
}

export default Dashboard
