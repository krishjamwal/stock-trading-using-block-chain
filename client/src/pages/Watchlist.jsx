import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

function Watchlist() {

  const [items, setItems] = useState([])
  const userId = localStorage.getItem("userId")

  const fetchWatchlist = () => {
    axios.get(`http://localhost:5000/api/watchlist?userId=${userId}`)
      .then(res => setItems(res.data))
  }

  useEffect(() => {
    fetchWatchlist()
  }, [])

  const removeItem = (id, name) => {
    axios.post("http://localhost:5000/api/watchlist/remove", { id })
      .then(() => {
        fetchWatchlist()
        toast.success(`${name} removed ❌`)
      })
  }

 return (
  <div>

    {/* HEADER */}
    <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
       Watchlist
    </h1>

    {items.length === 0 ? (

      <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700 rounded-2xl p-8 text-center">

        <p className="text-gray-400 text-lg">
          No items in watchlist ⭐
        </p>

      </div>

    ) : (

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

        {items.map(item => (

          <div
            key={item._id}
            className="bg-slate-800/60 backdrop-blur-md border border-slate-700 p-5 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 hover:border-yellow-500 transition duration-300"
          >

            <div className="flex items-center justify-between mb-3">

              <h3 className="text-xl font-bold text-white">
                ⭐ {item.name}
              </h3>

            </div>

            <p className="text-gray-400 text-sm">
              Added to your watchlist
            </p>

            <button
              onClick={() => removeItem(item._id, item.name)}
              className="mt-4 w-full bg-gradient-to-r from-red-500 to-red-700 px-4 py-2 rounded-xl hover:scale-105 transition shadow-lg"
            >
              🗑 Remove
            </button>

          </div>

        ))}

      </div>

    )}

  </div>
)
}

export default Watchlist
