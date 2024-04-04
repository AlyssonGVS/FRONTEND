import './Auth.css'

// Components
import { Link } from 'react-router-dom'
import Message from '../../components/Message'

// Hooks
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Redux
import { login, reset } from '../../slices/authSlice'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const { loading, error } = useSelector((state) => state.auth)



  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password
    }


    dispatch(login(user));

  }

  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  return (
    <div className='login auth forms'>
      {error && <Message msg={error} type="error" />}
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit} >
        <input type="email"
          placeholder='Digite seu email'
          
          onChange={(e) => setEmail(e.target.value)}
          value={email || ''}
        />
        <input type="password"
          
          placeholder='Digite sua senha'
          onChange={(e) => setPassword(e.target.value)}
          value={password || ''}
        />
        
        {!loading && <input type="submit" value="Entrar" className='btn btn-submit' />}
        {loading && <button className='btn btn-loading'><div className="spinner"></div></button>}
      </form>
    </div>
  )
}

export default Login