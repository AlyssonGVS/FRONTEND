import './Home.css'

// Hookes
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

// components
import { Link } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import Message from '../../components/Message'
import { MdClose } from 'react-icons/md'

// redux 

import {
  finalizeOS,
  getAllServiceOrders,
  getOSInProgress,
  resetMessage,
  updateServiceOrderWithoutData,

} from '../../slices/serviceOrdersSlice'



const Home = () => {



  const dispatch = useDispatch()

  const { serviceOrders, loading, error, message } = useSelector((state) => state.OS)

  // Load all OS

  useEffect(() => {
    dispatch(getOSInProgress())
  }, [dispatch])


  const [id, setId] = useState("")
  const [technicalAdvice, setTechnicalAdvice] = useState("")


  const openCheckoutModal = () => { // function for open Modal Finalize O.S
    const modal = document.getElementById('modal')

    if (!modal.classList.contains("open")) {
      modal.classList.add("open")
    } else {
      modal.classList.remove("open")

    }

  }

  const handleFinalize = async (e) => { // function for Finalize O.S
    e.preventDefault()
    const data = {
      id,
      technicalAdvice
    }
    await dispatch(finalizeOS(data))
    openCheckoutModal()



    setTimeout(() => {
      dispatch(resetMessage())
    }, 2000)
  }

  const checkStatus = (status) => {
    if (status === 0) {
      return <p>Em Progresso</p>
    } else if (status === 1) {
      return <p>Aguardando Formatação</p>
    } else if (status === 2) {
      return <p>Aguardando retorno do cliente</p>
    }
  }








  return (
    <div className="divMain">
      {error && (<Message type="error" msg={error} />)}
      {message && (<Message type="success" msg={message} />)}

      <div className='modal-fade' id='modal'>
        <div className="modal-content">
          <h1>Para finalizar a Ordem de Serviço de um parecer técnico</h1>
          <form onSubmit={handleFinalize}>

            <input type="text"
              id='textAreaTechnicalAdvice'
              onChange={(e) => setTechnicalAdvice(e.target.value)}
              value={technicalAdvice}
              placeholder='Parecer Técnico'
              autoComplete='off'
            />
            {loading ? (<button className='btn btn-loading'><div className="spinner"></div></button>) : (<div className="btns">
              <input type="submit" value="Enviar" className='bnt btn-black' id='btn-modal' />
              <input type="button" name="close" id="btn-close" className='btn btn-black' value="Fechar" onClick={openCheckoutModal} />
            </div>)}

            
          </form>
        </div>
      </div>
      {loading ? (<Spinner />) : (
        <ul id='Home' >

          {serviceOrders && serviceOrders.map((OS) => (

            <li key={OS._id}>
              <div className="options">
                <Link to={`/client/profile/${OS.clientId}`} >{OS.clientName}</Link >
                <p>Contato:{OS.clientContact}</p>
                <p>Id Acesso:{OS.idAccessRemote}</p>
                <p id='state'>
                  {checkStatus(OS.status)}
                </p>
                <div>
                  <button
                    onClick={() => { setId(OS._id), openCheckoutModal() }}
                    id='finishin'
                  >Finalizar</button>
                </div>
              </div>
              <div className='desc'>
                <p>{OS.description}</p>
              </div>
            </li>



          ))}

        </ul>
      )}


    </div>
  )
}

export default Home