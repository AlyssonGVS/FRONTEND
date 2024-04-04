
export const api = "http://localhost:5000/api"


export const requestConfig = (method, data, token = null, image = null) => { // Função de configuração dos request

    let config

    if (image) {
        config = {
            method,
            body: data,
            headers: {}
        }
    } else if (method === 'DELETE' || data === null) {
        config = {
            method,
            headers: {}
        }
    }else {
        config = {
            method,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }
    }

    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config


    // Esta função e responsaver por distinguir alguns dos metodos que vem na requisição 
    // 1- ela checa se nao e uma req que contenha imagem pois as config pra uma inserção de imagens e diferente 
    // 2- ela faz a checagem de se o metodo nao e um "DELETE" ou nao cem dados na "data"
    // 3- Checado essas duas condições acima ela monta a config de acordo com o resultado para enviar ao backend
    // E tambem faz a checagem se vem token na requisição e o manda junto na config para o backend

}