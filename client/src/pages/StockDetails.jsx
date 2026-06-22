import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js"

import { Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
)

function StockDetails() {

  const { id } = useParams()

  const [stock, setStock] = useState(null)

  const token = localStorage.getItem("token")

  useEffect(() => {

    axios.get(
      `http://localhost:5000/api/stocks/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    )
    .then(res => {
      setStock(res.data)
    })
    .catch(err => {
      console.log(err)
    })

  }, [id, token])

  if (!stock) {
    return <p>Loading...</p>
  }

  const chartData = {
    labels: (stock.history || []).map(item => item.time),

    datasets: [
      {
        label: stock.name,
        data: (stock.history || []).map(item => item.price),
        borderColor: "#22d3ee",
        backgroundColor: "rgba(34,211,238,0.2)",
        tension: 0.4,
        fill: true
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        labels: {
          color: "white"
        }
      }
    },

    scales: {
      x: {
        ticks: {
          color: "white"
        }
      },

      y: {
        ticks: {
          color: "white"
        }
      }
    }
  }

  return (
    <div>

      <h1 className="text-4xl font-bold mb-6">
        {stock.name}
      </h1>

      <div className="bg-slate-800/60 p-5 rounded-xl mb-6 h-[350px]">

        <Line
          data={chartData}
          options={chartOptions}
        />

      </div>

      <p className="mb-2 text-lg">
        Current Price: ₹{stock.price}
      </p>

      <p className="mb-6 text-lg">
        Quantity: {stock.quantity}
      </p>

      <div className="flex gap-3">

        <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
          Buy
        </button>

        <button className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700">
          Sell
        </button>

        <button className="bg-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-600">
          ⭐ Watch
        </button>

      </div>

    </div>
  )
}

export default StockDetails
