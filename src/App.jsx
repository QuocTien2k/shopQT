import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/SignUpPage'
import NotFoundPage from './Pages/NotFoundPage'
import Button from "./component/Button";
import Footer from './component/layout/Footer'
import ShoppingCart from './Pages/ShoppingCart'
import MainLayout from './Router/MainLayout'
import ContextProvider from './component/Context/DataContext'
function App() {

  return (
    <>
      <ContextProvider>
        <Routes>
          {/* Layout có Header */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<ShoppingCart />} />
          </Route>

          {/* Layout KHÔNG có Header */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/error" element={<NotFoundPage />} />
        </Routes>
        {/* <ButtonJSX label="Click me" onClick={() => console.log("Click")} variant="default" disabled={true} /> */}
        {/* <Footer /> */}
      </ContextProvider>
    </>
  )
}

export default App
