import axios from "./axios.js";

export const login = async (email) => {
  try {
    const response = await axios.post("login", email);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addUsuario = async (jugador) => {
  try {
    const response = await axios.post("/jugador", jugador);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const jugadorDelMes = async ()=>{
  try {
    const response = axios.get('/jugador/jugadordelmes')
    return response;
  } catch (error) {
    console.log(error)
  }
}