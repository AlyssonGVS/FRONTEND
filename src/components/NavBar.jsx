import './NavBar.css'
// Components
import { NavLink, Link } from 'react-router-dom'

// Hooks
import { useAuth } from '../hooks/useAuth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

//redux
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../slices/authSlice'

const openMenu = () => {
    const menu = document.querySelector(".optionsMenu")

    if (menu.classList.contains("open")) {
        menu.classList.remove("open")
    } else {
        menu.classList.add("open")
    }
}







const NavBar = () => {

    const auth = useAuth()
    const { user } = useSelector((state) => state.auth)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    


    const handleLogout = () => {

        
        dispatch(logout())
        dispatch(reset())

        navigate("/login")
    }


    return (
        <nav id='nav'>
            <div className="navContainer">
                <Link to="/">NpnFerramentas</Link>


                <ul className='options'>
                    {auth.auth ? (
                        <>
                            <NavLink to="/allClients">Clientes</NavLink>
                            <NavLink to="/allServiceOrders" id='allOsOptions'>Todas O.S</NavLink>
                            
                        </>
                    ) : (<>

                    </>)}
                </ul>

                <ul>
                    {/* { user && (<NavLink to="/login">Login</NavLink>)} */}
                    {user && (<div className='menu'>
                        <h1 id='logout' onClick={openMenu}>Bem-Vindo: Eduardo</h1>
                        <p onClick={handleLogout}>SAIR</p>
                        <div className='optionsMenu'>
                            <p>PERFIL</p>
                            <NavLink to="/cadastrar">CADASTRAR ADIMINISTRADOR</NavLink>
                            
                        </div>
                    </div>)}



                </ul>
            </div>

        </nav>
    )
}

export default NavBar