import axios from "../api/axios.js"

export const addPartida = async (dificultad) => {
    try {
        const response = axios.post('/partida', dificultad)
        return response;
    } catch (error) {
        console.log(error)
    }
}