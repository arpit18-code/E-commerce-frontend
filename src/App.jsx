import Home from './Pages/home'
import Cart from './Pages/cart'
import About from './Pages/about'
import Login from './Pages/login'
import ProtectedRoutes from './Components/protectedRoutes'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
          } />
        <Route path="/about" element={<About/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
