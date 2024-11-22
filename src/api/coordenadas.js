import axios from './axios.js'

export const addCoordenadas = async (barco) => {
    try {
        const response = axios.post('/coordenadas', barco)
        return response;
    } catch (error) {
        console.log(error)
    }
}