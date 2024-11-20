import axios from './axios.js'

export const getDificultad = async () => {
    try {
        const response = axios.get('/dificultad')
        return response;
    } catch (error) {
        console.log(error)
    }
}