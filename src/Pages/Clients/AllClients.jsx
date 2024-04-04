import './AllClients.css'

// components
import { Link } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import Message from '../../components/Message'

// redux
import { resetMessages, createClient, getAllClients, deleteClient } from '../../slices/clientsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'







const switchFunction = (bntClicked) => {
  const allClients = document.querySelector(".list")
  const createClient = document.querySelector(".createContainer")
  const btnAllClients = document.getElementById('btn-allClients')
  const btnCreate = document.getElementById('btn-createClient')

  if (bntClicked === "btn-createClient") {
    allClients.classList.remove("open")

    createClient.classList.add("open")

    btnCreate.setAttribute('disabled', true)
    btnAllClients.removeAttribute('disabled')



  } else {
    allClients.classList.add("open")
    createClient.classList.remove("open")
    btnCreate.removeAttribute('disabled')
    btnAllClients.setAttribute('disabled', true)
  }


}



const AllClients = () => {

  const [nameClient, setNameClient] = useState("")
  const [contact, setContact] = useState(Number)


  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();


    const client = {
      nameClient,
      contact
    }


    dispatch(createClient(client))

     setTimeout(() => {
       dispatch(resetMessages())
     }, 2000)




  }


  const dispatch = useDispatch()


  const { clients, loading, error, message } = useSelector((state) => state.clients)

  useEffect(
    () => {
      dispatch(getAllClients())
    }, [dispatch])


  const handleDelete = (id) => {
    dispatch(deleteClient(id))

    setTimeout(() => {
      dispatch(resetMessages())
    }, 2000)


  }


  return (
    <>
      <div className='divMain'>
        {error && <Message type="error" msg={error} />}
        {message && <Message type="success" msg={message} />}

        <div className="select-buttons">
          <button onClick={() => { switchFunction("btn-all") }} id='btn-allClients' className='btn btn-black'>Todos os Clientes</button>
          <button onClick={() => { switchFunction("btn-createClient") }} id='btn-createClient' className='btn btn-black'>Cadastrar Cliente</button>
        </div>

        <div className="createContainer">
          <div className="createForm forms">


            <h1>Cadastro de Clientes</h1>
            <form onSubmit={handleSubmit}>
              <input type="text"
                placeholder='Digite o nome do Cliente!'

                onChange={(e) => setNameClient(e.target.value)}
                value={nameClient || ''} />

              <input type="text"
                placeholder='Contato do Cliente'
                onChange={(e) => setContact(parseInt(e.target.value))}
                value={contact || ''}
                minLength={11}
                maxLength={11}

              />
              <p>Dica: Coloque o DDD mais numero com o 9 na frente. </p>

              {!loading && <input type="submit" value="Entrar" className='btn btn-submit' />}
              {loading && <button className='btn btn-loading'><div className="spinner"></div></button>}

            </form>
          </div>
        </div>

        <ul className='list open'>
          {clients && clients.map((client) => (


            <div className="container" key={client._id}>
              <div className="row">
                <div className="col-sm">
                  <p><strong>NOME:</strong> {client.nameClient}</p>
                </div>
                <div className="col-sm">
                  <p><strong>CONTATO:</strong> {client.contact}</p>
                </div>
                <div className="col-sm btns">
                  <Link to={`/client/profile/${client._id}`}><button className='btn btn-black'>VER AS O.S</button></Link>
                  <input type="button" className='btn btn-warning' value="EDITAR" />
                  <button className='btn btn-danger' onClick={() => handleDelete(client._id)}>EXCLUIR</button>
                </div>
              </div>
            </div>
          ))}
        </ul>

      </div>
    </>
  )
}

export default AllClients