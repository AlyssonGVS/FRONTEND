import { useEffect } from 'react'
import './ClientProfile.css'



//Hooks
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import { getClientById } from '../../slices/clientsSlice'

const statusOS = (state) => {
    if (state === 1) {
        return <p>Em andamento</p>
    } else if (state === 2) {
        return <p>Finalizada</p>
    }


}


const ClientProfile = () => {
    const { id } = useParams()

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getClientById(id))
    }, [dispatch])

    const { client, OSClients } = useSelector((state) => state.clients)




    return (
        <div className="divMain">
            <div className="infoClient">
                <p><strong>Cliente</strong>: <p>{client.nameClient}</p></p>
                <p><strong>Contato</strong>: {client.contact}</p>
            </div>

            <h1 id='tittleProfile'>ORDENS DE SERVIÇO PRESTADAS</h1>

            <div className="allOSProvided">
                <li id='description-table'>
                    <p>DESCRIÇÃO DA O.S</p>
                    <p>PARECER TÉCNICO</p>
                    <p>DATA DO SUPORTE</p>
                    <p>ESTADO FO SUPORTE</p>
                </li>
                <ul id='OS-table'>
                    {OSClients.map((OS) => (
                        <>
                        <li key={OS._id}>
                            <div id='p-description'>{OS.description}</div>
                            <p id='p-technicalAdvice'>{OS.technicalAdvice}</p>
                            <p>{OS.updatedAt}</p>
                            <p>{statusOS(OS.status)}</p>
                        </li>
                        <p id='diveseLine'></p>
                        </>

                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ClientProfile