import { api, requestConfig } from "../utils/config";


// Registrando um novo adm

const register = async (data) => {
    const config = requestConfig("POST", data);

    try {
        const res = await fetch(api + "/user/register", config).then((res) => res.json()).catch((err) => err)

        if (res.errors) {
            sessionStorage.setItem("Message", JSON.stringify(res))
        }

        return res
    } catch (error) {
        console.log(error)
    }





    // Função responsalvel pela comunicação com o backend para registrar um novo adm
    // A função recebe os dados do front, recebe os dados do request config
    // Acessa a api na rota correnta e com o methodo correto
    // e quando obtem sucesso recebe os dados que vem do backend e armazenaos na localStorage 
}

// Logando um usuario

const login = async (data) => {
    const config = requestConfig("POST", data)

    try {
        const res = await fetch(api + "/user/login", config)
            .then((res) => res.json())
            .catch((err) => err)
            console.log(res)
        if (res.token) {
            
            localStorage.setItem("user", JSON.stringify(res))
        }else{
            localStorage.setItem("Message", JSON.stringify(res))

        }

        return res;


    } catch (error) {
        console.log(error)
    }
}

// Deslogando o usuario
const logout = () => {
    localStorage.removeItem("user")
}

const authService = {
    register,
    login,
    logout,
}

export default authService