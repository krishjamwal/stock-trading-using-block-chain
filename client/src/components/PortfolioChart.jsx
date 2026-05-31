import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts"

const PortfolioChart = ({ transactions }) => {

  const data = transactions.map((t, index) => ({
    name: t.name,
    value: t.price * t.quantity
  }))

  if (data.length === 0) {
    return <p className="mt-5">No data for chart</p>
  }

  return (

    <div className="bg-slate-800 p-5 rounded-xl mt-10">

      <h2 className="text-2xl mb-5">
        Portfolio Chart
      </h2>

      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#444" />
        <Line type="monotone" dataKey="value" stroke="#4ade80" />
      </LineChart>

    </div>

  )
}

export default PortfolioChart
