import axios from "../api/axios.js";

export const getDispotisivos = async () => {
  try {
    const response = await axios.get("/dispositivo");
    return response;
  } catch (error) {
    console.log(error);
  }
};
