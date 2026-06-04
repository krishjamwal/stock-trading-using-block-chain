import axios from "axios"

const StockCard = ({ name, price, change, id, refresh }) => {

  // 🟢 BUY
  const buyStock = () => {
    axios.post("http://localhost:5000/api/stocks/buy", {
      id,
      quantity: 1
    }, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    .then(() => refresh())
    .catch(err => console.log(err))
  }

  // 🔴 SELL
  const sellStock = () => {
    axios.post("http://localhost:5000/api/stocks/sell", {
      id,
      quantity: 1
    }, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    .then(() => refresh())
    .catch(err => console.log(err))
  }

  return (
    <div className="bg-gray-800 p-4 rounded shadow">

      <h3 className="text-lg font-bold">{name}</h3>
      <p>Price: ₹{price}</p>
      <p>Change: {change}%</p>

      <div className="mt-3 flex gap-2">
        <button
          className="bg-blue-500 px-3 py-1 rounded"
          onClick={buyStock}
        >
          Buy
        </button>

        <button
          className="bg-red-500 px-3 py-1 rounded"
          onClick={sellStock}
        >
          Sell
        </button>
      </div>

    </div>
  )
}

export default StockCard
