import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Portfolio from "./pages/Portfolio"
import Transactions from "./pages/Transactions"
import Watchlist from "./pages/Watchlist"
import StockDetails from "./pages/StockDetails"

import Layout from "./components/Layout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <>
      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* PORTFOLIO */}
        <Route
          path="/portfolio"
          element={
            <ProtectedRoute>
              <Layout>
                <Portfolio />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* TRANSACTIONS */}
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Layout>
                <Transactions />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* WATCHLIST */}
        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <Layout>
                <Watchlist />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* STOCK DETAILS */}
        <Route
          path="/stock/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <StockDetails />
              </Layout>
            </ProtectedRoute>
          }
        />

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
      />
    </>
  )
}

export default App
