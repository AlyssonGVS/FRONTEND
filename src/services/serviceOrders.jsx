import { api, requestConfig } from "../utils/config";


const getAllServiceOrders = async (token) => {
    const config = requestConfig("GET", null, token)

    try {
        const res = await fetch(api + "/serviceOrders/all", config)
            .then((res) => res.json())
            .catch((err) => err)

        return res
    } catch (error) {
        console.log(error)
    }
}

const getOSInProgress = async (token) => {
    const config = requestConfig("GET", null, token)


    try {
        const res = await fetch(api + "/serviceOrders/", config)
            .then((res) => res.json())
            .catch((err) => err)
        return res
    } catch (error) {
        console.log(error);
    }
}



//Update a Os
const updateServiceOrderWithouData = async (id, token) => {

    const config = requestConfig("PUT", {}, token)

    try {
        const res = await fetch(api + `/serviceOrders/finished/${id}`, config)
            .then((res) => res.json())
            .catch((err) => err)

        return res
    } catch (error) {
        console.log(error)
    }
}


const finalizeOS = async (data, token) => {
    const config = requestConfig("PUT", data, token)

    try {
        const res = await fetch(api + "/serviceOrders/finalize/", config)
            .then((res) => res.json())
            .catch((err) => err)

        return res
    } catch (error) {
        console.log(error)
    }
}


// Delete Os
const deleteServiceOrder = async (id, token) => {
    const config = requestConfig("DELETE", null, token)

    try {
        const res = await fetch(api + "/serviceOrders/" + id, config)
            .then((res) => res.json())
            .catch((err) => err)
        return res
    } catch (error) {
        console.log(error);
    }
}

const createServiceOrder = async (data, token) => {
    const config = requestConfig("POST", data, token)

    try {
        const res = await fetch(api + "/serviceOrders/createOS", config)
            .then((res) => res.json())
            .catch((err) => err)
        return res;
    } catch (error) {
        console.log(error);
    }


}
const serviceOrdersService = {
    getAllServiceOrders,
    updateServiceOrderWithouData,
    deleteServiceOrder,
    createServiceOrder,
    getOSInProgress,
    finalizeOS,


}

export default serviceOrdersService