import { useState } from "react"
import TradeModal from "./TradeModal"
import TransactionTable from "./TransactionTable"
import PortfolioChart from "./PortfolioChart"

const StockTable = () => {

  const [search, setSearch] = useState("")
  const [selectedStock, setSelectedStock] = useState(null)
  const [transactions, setTransactions] = useState([])
  const totalInvestment = transactions.reduce(
  (acc, t) => acc + t.price * t.quantity,
  0
)

const totalStocks = transactions.reduce(
  (acc, t) => acc + Number(t.quantity),
  0
)

  const stocks = [
    {
      id: 1,
      name: "Apple",
      symbol: "AAPL",
      price: 220,
      change: "+2.5%"
    },

    {
      id: 2,
      name: "Tesla",
      symbol: "TSLA",
      price: 180,
      change: "-1.2%"
    },

    {
      id: 3,
      name: "Microsoft",
      symbol: "MSFT",
      price: 310,
      change: "+4.1%"
    },

    {
      id: 4,
      name: "Amazon",
      symbol: "AMZN",
      price: 145,
      change: "+1.8%"
    }
  ]

  return (

  <div className="bg-slate-800 p-5 rounded-xl mt-10">

    <div className="grid grid-cols-3 gap-5 mb-10">

      <div className="bg-slate-700 p-5 rounded-xl">
        <h2>Total Investment</h2>
        <p className="text-2xl mt-2">${totalInvestment}</p>
      </div>

      <div className="bg-slate-700 p-5 rounded-xl">
        <h2>Total Stocks</h2>
        <p className="text-2xl mt-2">{totalStocks}</p>
      </div>

      <div className="bg-slate-700 p-5 rounded-xl">
        <h2>Portfolio Value</h2>
        <p className="text-2xl mt-2">${totalInvestment}</p>
      </div>

    </div>
      <div className="flex items-center justify-between mb-5">

        <h2 className="text-2xl font-bold">
          Market Stocks
        </h2>

        <input
          type="text"
          placeholder="Search Stock..."
          className="bg-slate-700 p-3 rounded-lg outline-none"
        />

      </div>

      <table className="w-full">

        <thead>

          <tr className="text-left border-b border-slate-600">

            <th className="p-3">Name</th>

            <th className="p-3">Symbol</th>

            <th className="p-3">Price</th>

            <th className="p-3">Change</th>

            <th className="p-3">Action</th>

          </tr>

        </thead>

        <tbody>

          {
            stocks.map((stock) => (

              <tr
                key={stock.id}
                className="border-b border-slate-700"
              >

                <td className="p-3">
                  {stock.name}
                </td>

                <td className="p-3">
                  {stock.symbol}
                </td>

                <td className="p-3">
                  ${stock.price}
                </td>

                <td
                  className={`p-3 ${
                    stock.change.includes("+")
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {stock.change}
                </td>

                <td className="p-3 flex gap-3">

                 <button
  onClick={() => setSelectedStock(stock)}
  className="bg-green-600 px-4 py-2 rounded-lg"
>
  Buy
</button>

                  <button className="bg-red-600 px-4 py-2 rounded-lg">
                    Sell
                  </button>

                </td>

              </tr>

            ))
          }

        </tbody>

      </table>
   {
  selectedStock && (
    <TradeModal
      stock={selectedStock}
      onClose={() => setSelectedStock(null)}
      onConfirm={(stock, qty) => {
        setTransactions([
          ...transactions,
          {
            name: stock.name,
            price: stock.price,
            quantity: qty
          }
        ])
      }}
    />
  )
}
<TransactionTable transactions={transactions} />
<PortfolioChart transactions={transactions} />

    </div>

  )
}

export default StockTable
