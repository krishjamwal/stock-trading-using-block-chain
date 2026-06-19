import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

function Portfolio() {
  const [stocks, setStocks] = useState([])
  const [loading, setLoading] = useState(false)

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")

  const token = localStorage.getItem("token")

  const navigate = useNavigate()
  

  const fetchStocks = () => {
    setLoading(true)

    axios.get("http://localhost:5000/api/stocks", {
      headers: { Authorization: "Bearer " + token }
    })
    .then(res => {
      setStocks(res.data)
      setLoading(false)
    })
    .catch(err => {
      console.log(err)
      setLoading(false)
      toast.error("Failed to load stocks ❌")
    })
  }

 useEffect(() => {

  fetchStocks()

  // Refresh stocks every minute
  const interval = setInterval(() => {
    fetchStocks()
  }, 60000)

  return () => clearInterval(interval)

}, [])

  // ✅ ADD STOCK
  const addStock = () => {
    if (!name || !price || !quantity) {
      toast.warning("Fill all fields ⚠️")
      return
    }

    axios.post("http://localhost:5000/api/stocks/add",
      { name, price, quantity },
      { headers: { Authorization: "Bearer " + token } }
    )
    .then(() => {
      setName("")
      setPrice("")
      setQuantity("")
      fetchStocks()
      toast.success(`Added ${name} to portfolio ✅`)
    })
    .catch(() => {
      toast.error(`Error adding ${name} ❌`)
    })
  }

  // ✅ BUY
  const buyStock = (id, stockName) => {
    toast.info("Processing... ⏳")

    axios.post("http://localhost:5000/api/stocks/buy",
      { id, quantity: 1 },
      { headers: { Authorization: "Bearer " + token } }
    )
    .then(() => {
      fetchStocks()
      toast.success(`Bought ${stockName} 📈`)
    })
    .catch(() => toast.error(`Failed to buy ${stockName} ❌`))
  }

  // ✅ SELL
  const sellStock = (id, stockName) => {
    toast.info("Processing... ⏳")

    axios.post("http://localhost:5000/api/stocks/sell",
      { id, quantity: 1 },
      { headers: { Authorization: "Bearer " + token } }
    )
    .then(() => {
      fetchStocks()
      toast.success(`Sold ${stockName} 📉`)
    })
    .catch(() => toast.error(`Failed to sell ${stockName} ❌`))
  }

  // ⭐ WATCHLIST FUNCTION (STEP 5)
  const addToWatchlist = (stockName) => {
    const userId = localStorage.getItem("userId")

    axios.post("http://localhost:5000/api/watchlist/add", {
      userId,
      name: stockName
    })
    .then(() => {
      toast.success(`${stockName} added to watchlist ⭐`)
    })
    .catch(() => {
      toast.error("Failed to add to watchlist ❌")
    })
  }



 return (
  <div>

    {/* HEADER */}
    <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
       Portfolio
    </h1>


    {/* ADD STOCK */}
    <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700 p-5 rounded-xl shadow-lg mb-6">

      <h2 className="text-lg mb-3">Add Stock</h2>

      <div className="flex flex-col md:flex-row gap-2">

        <input
          className="p-2 rounded-lg bg-slate-900 text-white border border-slate-600 outline-none focus:ring-2 focus:ring-cyan-400 w-full"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          className="p-2 rounded-lg bg-slate-900 text-white border border-slate-600 outline-none focus:ring-2 focus:ring-cyan-400 w-full"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />

        <input
          className="p-2 rounded-lg bg-slate-900 text-white border border-slate-600 outline-none focus:ring-2 focus:ring-cyan-400 w-full"
          placeholder="Qty"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
        />

        <button
          onClick={addStock}
          className="bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-lg hover:scale-105 transition shadow-lg"
        >
          Add
        </button>

      </div>
    </div>

    {/* STOCK LIST */}
    {loading ? (
      <p className="text-center text-lg animate-pulse">
        Loading stocks... ⏳
      </p>
    ) : stocks.length === 0 ? (
      <p className="text-center text-gray-400">
        No stocks added yet
      </p>
    ) : (

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

        {stocks.map(stock => {

          const profit =
            (stock.price - (stock.buyPrice || stock.price)) *
            stock.quantity

          return (

            <div
  key={stock._id}
  onClick={() => navigate(`/stock/${stock._id}`)}
  className="cursor-pointer bg-slate-800/60 backdrop-blur-md border border-slate-700 p-5 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 hover:border-cyan-500 transition duration-300"
>

              <h3 className="font-bold text-lg mb-2">
                {stock.name}
              </h3>

              <p>Price: ₹{stock.price}</p>
              <p>Qty: {stock.quantity}</p>

              <p
                className={`mt-2 font-semibold ${
                  profit >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                Profit: ₹{profit}
              </p>

              {/* BUY / SELL */}
              <div className="flex flex-col sm:flex-row gap-2 mt-3">

                <button
                 onClick={(e) => {
  e.stopPropagation()
  buyStock(stock._id, stock.name)
}}
                  className="bg-blue-600 px-3 py-2 rounded-lg hover:bg-blue-700 transition w-full"
                >
                  Buy
                </button>

                <button
                 onClick={(e) => {
  e.stopPropagation()
  sellStock(stock._id, stock.name)
}}
                  disabled={stock.quantity <= 0}
                  className={`px-3 py-2 rounded-lg w-full transition ${
                    stock.quantity <= 0
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  Sell
                </button>

              </div>

              {/* WATCHLIST */}
              <button
               onClick={(e) => {
  e.stopPropagation()
  addToWatchlist(stock.name)
}}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-2 rounded-lg hover:scale-105 transition w-full mt-2 shadow"
              >
                ⭐ Watch
              </button>

            </div>

          )
        })}

      </div>

    )}

  </div>
)
}

export default Portfolio
