import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { login } from "../api/Auth.js";


export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        checkLogin();
    }, []);

    const signin = async (email) => {
        try {
            const rsp = await login(email);
            console.log(rsp)
            if (rsp.data != null) {
                setUser(rsp.data)
                const { token } = Cookies.get();
                if (!token) Cookies.set("token", JSON.stringify(user));
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
        Cookies.remove('token');
        setIsAuthenticated(false);
        setUser(null);
    }


    const checkLogin = async () => {
        try {
            const token = Cookies.get("token");

            if (token) setIsAuthenticated(true);
            else setIsAuthenticated(false);
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
        user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}