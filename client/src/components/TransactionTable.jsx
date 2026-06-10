const TransactionTable = ({ transactions }) => {
  return (
    <div className="bg-slate-800 p-5 rounded-xl mt-10">
      <h2 className="text-2xl mb-5">Transactions</h2>

      {
        transactions.length === 0 ? (
          <p>No transactions yet</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
              </tr>
            </thead>

            <tbody>
              {
                transactions.map((t, i) => (
                  <tr key={i}>
                    <td>{t.name}</td>
                    <td>${t.price}</td>
                    <td>{t.quantity}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )
      }

    </div>
  )
}

export default TransactionTable
