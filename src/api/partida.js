import axios from "../api/axios.js"

export const addPartida = async (dificultad) => {
    try {
        const response = axios.post('/partida', dificultad)
        return response;
    } catch (error) {
        console.log(error)
    }
}

export const updatePartida = async (id)=> {
    try {
        const response = axios.put(`/partida/${id}`)
        return response;
    } catch (error) {
        console.log(error)
    }
}