import { useEffect, useState } from "react"
import axios from "axios"

function Transactions() {

  const [transactions, setTransactions] = useState([])
  const [search, setSearch] = useState("")
  const [type, setType] = useState("all")

  const token = localStorage.getItem("token")

  const fetchTransactions = () => {
    axios.get("http://localhost:5000/api/stocks/transactions", {
      headers: { Authorization: "Bearer " + token }
    })
    .then(res => setTransactions(res.data))
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  // ✅ STEP 3 — FILTER LOGIC
  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.stockName
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesType = type === "all" || t.type === type

    return matchesSearch && matchesType
  })

  const exportCSV = () => {

  const headers = [
    "Stock",
    "Type",
    "Quantity",
    "Price",
    "Date"
  ]

  const rows = transactions.map(t => [
    t.stockName,
    t.type,
    t.quantity,
    t.price,
    new Date(t.date).toLocaleString()
  ])

  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.join(","))
  ].join("\n")

  const blob = new Blob(
    [csvContent],
    { type: "text/csv;charset=utf-8;" }
  )

  const link = document.createElement("a")

  link.href = URL.createObjectURL(blob)
  link.download = "transactions.csv"

  link.click()
}

 return (
  <div>

    {/* HEADER */}
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">

      <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
         Transactions
      </h1>

      <button
        onClick={exportCSV}
        className="bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-xl hover:scale-105 transition shadow-lg"
      >
         Export CSV
      </button>

    </div>

    {/* FILTERS */}
    <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700 p-4 rounded-2xl mb-6">

      <div className="flex flex-col md:flex-row gap-3">

        <input
          type="text"
          placeholder="🔍 Search stock..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 rounded-lg bg-slate-900 text-white border border-slate-600 outline-none focus:ring-2 focus:ring-cyan-400 w-full"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-3 rounded-lg bg-slate-900 text-white border border-slate-600 outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <option value="all">All</option>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>

      </div>

    </div>

    {/* TABLE */}
    <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700 rounded-2xl overflow-hidden shadow-xl">

      <div className="overflow-x-auto">

        <table className="w-full text-center">

          <thead className="bg-slate-900">

            <tr>
              <th className="p-4">Stock</th>
              <th className="p-4">Type</th>
              <th className="p-4">Qty</th>
              <th className="p-4">Price</th>
              <th className="p-4">Date</th>
            </tr>

          </thead>

          <tbody>

            {filteredTransactions.map((t, i) => (

              <tr
                key={i}
                className="border-b border-slate-700 hover:bg-slate-700/30 transition"
              >

                <td className="p-4 font-semibold">
                  {t.stockName}
                </td>

                <td
                  className={`p-4 font-bold ${
                    t.type === "buy"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {t.type.toUpperCase()}
                </td>

                <td className="p-4">
                  {t.quantity}
                </td>

                <td className="p-4">
                  ₹{t.price}
                </td>

                <td className="p-4 text-sm text-gray-400">
                  {new Date(
                    t.date || t.createdAt
                  ).toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  </div>
)
}

export default Transactions
