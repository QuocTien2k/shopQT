import { Route, Routes } from 'react-router-dom'
import Header from './component/layout/Header'
import HomePage from './Pages/HomePage'
import { LoginPage } from './Pages/LoginPage'
import { SignUpPage } from './Pages/SignUpPage'
import NotFoundPage from './Pages/NotFoundPage'
import ButtonJSX from './component/layout/Button/Button'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/error" element={<NotFoundPage />} />
      </Routes>
      {/* <ButtonJSX label="Click me" onClick={() => console.log("Click")} variant="default" disabled={'disabled'} /> */}
    </>
  )
}

export default App
