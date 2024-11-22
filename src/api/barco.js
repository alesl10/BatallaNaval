import axios from './axios.js'     

export const addBarco = async (barco) => {
    try {
        const response = axios.post('/barco', barco)
        return response;
    } catch (error) {
        console.log(error)
    }
}