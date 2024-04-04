
import './App.css'

//Router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Hooks
import { useAuth } from './hooks/useAuth'


//Pages
import Home from './Pages/Home/Home'

// Components
import NavBar from './components/NavBar'
import Register from './Pages/Auth/Register'
import Login from './Pages/Auth/Login'
import AllClients from './Pages/Clients/AllClients'
import AllServiceOrders from './Pages/Clients/AllServiceOrders'
import ClientProfile from './Pages/Clients/ClientProfile'



function App() {

  const { auth, loading } = useAuth()
  if (loading) {
    return <div className="loadingPage">
      <div className="spinnerPage"></div>
    </div>
  }



  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={auth ? <Home /> : <Navigate to="/login" />} />
          <Route path='/cadastrar' element={auth ? <Register /> : <Navigate to="/login" />} />
          <Route path='/login' element={!auth ? <Login /> : <Navigate to="/" />} />
          <Route path='/allClients' element={auth ? <AllClients /> : <Navigate to="/login" />} />
          <Route path='/allServiceOrders' element={auth ? <AllServiceOrders /> : <Navigate to="/login" />} />
          <Route path='/client/profile/:id' element={auth ? <ClientProfile/> : <Navigate to="/login" />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
