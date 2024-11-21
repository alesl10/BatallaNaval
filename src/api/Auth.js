import axios from './axios.js'

export const login = async (email) => {
    try {
        const response = await axios.post('login', email)
        return response.data;
    } catch (error) {
        console.log(error)
    }
} 