import { Link } from 'react-router-dom'
import './AllServiceOrders.css'

// Components
import Message from '../../components/Message'

//Hooks
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { createServiceOrder, deleteServiceOrder, getAllServiceOrders, resetMessage } from '../../slices/serviceOrdersSlice'
import { getAllClients } from '../../slices/clientsSlice'






const AllServiceOrders = () => {

    const dispatch = useDispatch()

    //dispatch para obter as OS
    useEffect(() => {
        dispatch(getAllServiceOrders())
        dispatch(getAllClients())
    }, [dispatch])
    //======


    //importando os states da store
    const { serviceOrders, loading, error, message } = useSelector((state) => state.OS)
    const { clients } = useSelector((state) => state.clients)
    //==========

    const openMenu = (idOS) => {

        const rowOS = document.getElementById('row-OS')

        const desc = document.getElementById(idOS)
        if (desc.classList.contains("open")) {

            desc.classList.remove("open")

        } else {

            desc.classList.add("open")
        }



    }

    const switchTemplate = (btnClicked) => {
        const btnAll = document.getElementById('btn-all')
        const btnCreate = document.getElementById('btn-create')
        const divAll = document.getElementById('service-Orders-FullArea')
        const divCreate = document.getElementById('create-OS')
        if (btnClicked === "all") {
            btnAll.setAttribute('disabled', true)
            btnCreate.removeAttribute('disabled')
            divAll.classList.add("open")
            divCreate.classList.remove("open")
        } else if (btnClicked === "create") {
            btnAll.removeAttribute('disabled')
            btnCreate.setAttribute('disabled', true)
            divAll.classList.remove("open")
            divCreate.classList.add("open")
        }

    }


    const handleDelete = (id) => {

        dispatch(deleteServiceOrder(id))

        setTimeout(() => {
            dispatch(resetMessage())
        }, 3000)
    }


    // Hooks
    const [description, setDescription] = useState('')
    const [idAccess, setIdAccess] = useState('')
    const [idClient, setIdClient] = useState('')

    const handleSubmit = (e) => {

        e.preventDefault();
        const serviceOrder = {
            description,
            idAccessRemote: idAccess,
            clientId: idClient

        }

        dispatch(createServiceOrder(serviceOrder))

        setTimeout(() => {
            dispatch(resetMessage())
        }, 3000)

        description = ''
        idAccess = ''

    }

    

    // Função de search
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        const results = clients.filter(item =>
            item.nameClient.toLowerCase().includes(term.toLowerCase())
        );
        setSearchResults(results);
    };

   



    return (



        <div className='divMain'>
            {message && <Message type="success" msg={message} />}
            {error && <Message type="error" msg={error} />}


            <div className="select-buttons">
                <button onClick={() => switchTemplate("all")} id='btn-all' className='btn btn-black'>Todas O.S</button>
                <button onClick={() => switchTemplate("create")} id='btn-create' className='btn btn-black'>Cadastrar O.S</button>
            </div>
            <div className="container fullArea ocult open" id='service-Orders-FullArea'>
                <div className="row">
                    <div className="col-sm">Nome Cliente:</div>
                    <div className="col-sm">Contato:</div>
                    <div className="col-sm">Id Acesso Remoto:</div>
                    <div className="col-sm">Data Criação:</div>
                    <div className="col-sm">Data Da finalização:</div>
                    <div className="col-sm">Status</div>
                    <div className="col-sm col-btn"></div>


                </div>
                {serviceOrders && serviceOrders.map((OS) => (
                    <div key={OS._id}>
                        <div className="row" id='row-OS' >
                            <div className="col-sm">{OS.clientName}</div>
                            <div className="col-sm">{OS.clientContact}</div>
                            <div className="col-sm">{OS.idAccessRemote}</div>
                            <div className="col-sm">{OS.createdAt}</div>
                            <div className="col-sm">{OS.updatedAt}</div>
                            <div className="col-sm">{OS.status}</div>
                            <div className="col-sm col-btn"><button className='btn btn-black' onClick={() => openMenu(OS._id)}>DETALHES </button></div>



                        </div>

                        <div className="details" id={OS._id}>
                            <div className="description">
                                <button className='btn btn-warning' ><Link to="/teste">EDITAR</Link></button>
                                <span><strong>Descrição</strong></span>
                                <p>{OS.description}</p>
                            </div>
                            <div className="technical-adivice">
                                <button className='btn btn-danger' onClick={() => handleDelete(OS._id)}>EXCLUIR</button>
                                <span><strong>Parecer Tecnico</strong></span>
                                <p>{OS.technicalAdvice}</p>
                            </div>
                        </div>

                    </div>
                ))}

            </div>
            <div className="createContainer" id='create-OS'>
                <div className="createForms forms">
                    <h1>Gerar Ordem de Serviço</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder='Descrição da O.S'
                            onChange={(e) => setDescription(e.target.value)}
                            value={description || ''} />
                        <input type="text" placeholder='Digite o ID do Acesso Remoto'
                            onChange={(e) => setIdAccess(e.target.value)}
                            value={idAccess || ''} />


                        <div className="select">
                            <span></span>
                            <input
                                type="text"
                                placeholder="Digite o nome do cliente"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <select name="clients" id="selectClients" size="5">

                                {searchResults.map((item) => (


                                    <option key={item._id} onClick={() => setIdClient(item._id)}>{item.nameClient}</option>
                                ))}
                            </select>
                        </div>




                        <input type="submit" value="Gerar O.S" />

                    </form>
                </div>
            </div>
        </div>
    )
}

export default AllServiceOrders