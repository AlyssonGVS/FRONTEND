import './Auth.css'


// Components
import { Link } from 'react-router-dom'
import Message from '../../components/Message'

// Hooks
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Redux
import { register, reset } from '../../slices/authSlice'


const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const dispatch = useDispatch()

  const { loading, error } = useSelector((state) => state.auth)

  const handleSubmite = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword
    }


    dispatch(register(user))
  }

  useEffect(()=>{
    dispatch(reset())
  }, [dispatch])
  return (
    <div className='auth cadastro'>
      <h1>Cadastro de Administrador</h1>
      <form onSubmit={handleSubmite}>
        <input
          type="text"
          placeholder='Nome'
          onChange={(e) => setName(e.target.value)}
          value={name} />
        <input
          type="email"
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          value={email} />
        <input
          type="password"
          placeholder='Senha'
          onChange={(e) => setPassword(e.target.value)}
          value={password} />
        <input
          type="password"
          placeholder='Confirm a senha.'
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword} />
        {!loading && <input type="submit" value="CADASTRAR" className='btn btn-submit'/>}
        {loading && <input type="submit" value="Aguarde..." disabled className='btn btn-loading'/>}
        {error && <Message msg={error} type="error"/>}


      </form>
    </div>
  )
}

export default Register