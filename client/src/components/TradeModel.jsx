import { useState } from "react"

const TradeModal = ({ stock, onClose }) => {

  const [quantity, setQuantity] = useState(1)

  const total = stock.price * quantity

  return (

    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

      <div className="bg-slate-800 p-6 rounded-xl w-[350px]">

        <h2 className="text-2xl mb-4">
          Buy {stock.name}
        </h2>

        <p className="mb-2">Price: ${stock.price}</p>

        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-slate-700"
        />

        <p className="mb-4">
          Total: ${total}
        </p>

        <div className="flex gap-3">

         <button
  onClick={() => {
    onConfirm(stock, quantity)
    onClose()
  }}
  className="bg-green-600 px-4 py-2 rounded"
>
  Confirm
</button>

          <button
            onClick={onClose}
            className="bg-red-500 px-4 py-2 rounded"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>

  )
}

export default TradeModal
