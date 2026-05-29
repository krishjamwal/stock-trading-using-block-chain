import Sidebar from "./Sidebar"

function Layout({ children }) {
  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen">

      <Sidebar />

      <div className="flex-1 p-4 md:p-6">
        {children}
      </div>

    </div>
  )
}

export default Layout
