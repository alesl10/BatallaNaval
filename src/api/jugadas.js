import axios from "./axios.js";

export const addJugadas = async (jugada) => {
  try {
    const response = axios.post("/jugada", jugada);
    return response;
  } catch (error) {
    console.log(error);
  }
};
