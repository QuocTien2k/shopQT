import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/SignUpPage'
import NotFoundPage from './Pages/NotFoundPage'
import Footer from './component/layout/Footer'
import ShoppingCart from './Pages/ShoppingCart'
import MainLayout from './Router/MainLayout'
import ContextProvider from './component/Context/DataContext'
import ProductDetail from './Pages/ProductDetail'
function App() {

  return (
    <>
      <ContextProvider>
        <Routes>
          {/* Layout có Header */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Route>

          {/* Layout KHÔNG có Header */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/error" element={<NotFoundPage />} />
        </Routes>

        {/* <Footer /> */}
      </ContextProvider>
    </>
  )
}

export default App
