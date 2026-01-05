import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getServerIp, saveServerIp, clearIp } from "../utils/apiConfig";

const LoginContext = createContext(null);

export const LoginProvider = ({children}) => {
    const [numeroEmpleado, setNumeroEmpleado] = useState("");
    const [serverIp, setServerIp] = useState(null);
    const [error, setError] = useState(null);
    const [modalLoginErrorVisible, setModalLoginErrorVisible] = useState(false);
    const [modalConfiguracionDeIPVisible, setModalConfiguracionDeIPVisible] = useState(false);

    //Cargar ip al iniciarl el layout, una sola vez
    useEffect(()=>{
        const loadIp = async () => {
            const ip = await getServerIp();
            setServerIp(ip);
        }
        loadIp();
    }, []);

    const saveIp = async(ip) => {
        await saveServerIp(ip);
        setServerIp(ip);
    };

    const clearServerIp = async () => {
        await clearIp();
        setServerIp(null);
    }

    const value = useMemo(() => ({
        numeroEmpleado,
        setNumeroEmpleado,

        serverIp, 
        saveIp,
        clearServerIp,

        error,
        setError,

        modalConfiguracionDeIPVisible,
        setModalConfiguracionDeIPVisible,
        modalLoginErrorVisible,
        setModalLoginErrorVisible
    }), [numeroEmpleado, modalConfiguracionDeIPVisible, serverIp, modalLoginErrorVisible, error]);

        return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    )
}

export const useLogin = () => {
    const context = useContext(LoginContext);
    if(!context) throw new Error('useLogin debe utilizarse dentro de LoginProvider');
    return context;
}