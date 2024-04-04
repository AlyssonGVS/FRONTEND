import { api, requestConfig } from "../utils/config";

// Create: Cliente

const createClient = async (data, token) => {

    const config = requestConfig("POST", data, token)

    try {
        const res = await fetch(api + "/client/createClient", config).then((res) => res.json()).catch((err) => err)

        if (res.errors) {
            sessionStorage.setItem("errors", JSON.stringify(res))
        }
        // if(res.message){
        //     sessionStorage.setItem("message", JSON.stringify(res))
        // }


        return res

    } catch (error) {
        console.log(error);
    }


}

// Read:  get all clients
const getClients = async (token) => {


    const config = requestConfig("GET", null, token)

    try {
        const res = await fetch(api + "/client/", config)
            .then((res) => res.json())
            .catch(err => err)
        return res;
    } catch (error) {
        console.log(error);
    }
}
// Read: get clientBy id
const getClientById = async (id, token) => {
    console.log("chegou no service");

    const config = requestConfig("GET", null, token)

    try {
        const res = await fetch(api + "/client/" + id, config)
        .then((res) => res.json())
        .catch((err) => err)
        return res;
    } catch (error) {
        console.log(error)
    }

    


}

// Delete: Delete an client 

const deleteClient = async (id, token) => {
    const config = requestConfig("DELETE", null, token)

    try {
        const res = await fetch(`${api}/client/Delete/${id}`, config)
            .then((res) => res.json())
            .catch((err) => err)

        return res;
    } catch (error) {
        console.log(error)
    }
}


const clientsService = {
    createClient,
    getClients,
    deleteClient,
    getClientById,


}

export default clientsService