const Navbar = () => {

  return (

    <div className="flex items-center justify-between bg-slate-900 p-5 border-b border-slate-700">

      <h1 className="text-2xl font-bold text-blue-400">
        Stock Trading Platform
      </h1>

      <div className="flex items-center gap-5">

        <p className="text-gray-300">
          Welcome, krish
        </p>

        <button className="bg-red-500 px-4 py-2 rounded-lg">
          Logout
        </button>

      </div>

    </div>

  )
}

export default Navbar
