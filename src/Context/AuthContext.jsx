import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { login } from "../api/Auth.js";
import { jugadorDelMes } from "../api/Auth.js";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState();
  const [mejorJugador, setMejorJugador] = useState();

  useEffect(() => {
    checkLogin();
    obtenerJugadorDelMes();
  }, []);

  const obtenerJugadorDelMes = async () => {
    const response = await jugadorDelMes();
    console.log(response.data.data);
    let mejor = response.data.data;
    setMejorJugador(mejor);
  };

  const signin = async (email) => {
    try {
      const rsp = await login(email);
      console.log(rsp.data.data);
      if (rsp.data != null) {
        let usuario = rsp.data.data;
        setUser(usuario);
        const { token } = Cookies.get();
        if (!token) Cookies.set("token", JSON.stringify(usuario));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
      setError("Hubo un error en el servidor. Intenta nuevamente.");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  const logout = async () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  const checkLogin = async () => {
    try {
      const token = Cookies.get("token");

      if (token) {
        setUser(JSON.parse(token));
        setIsAuthenticated(true);
      } else setIsAuthenticated(false);
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    signin,
    error,
    isAuthenticated,
    checkLogin,
    logout,
    user,
    mejorJugador
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
