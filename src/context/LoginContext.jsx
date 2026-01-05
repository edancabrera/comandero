import { createContext, useContext, useMemo, useState } from "react";

const LoginContext = createContext(null);

export const LoginProvider = ({children}) => {
    const [numeroEmpleado, setNumeroEmpleado] = useState("");
    const [modalConfiguracionDeIPVisible, setModalConfiguracionDeIPVisible] = useState(false);

    const value = useMemo(() => ({
        numeroEmpleado,
        setNumeroEmpleado,

        modalConfiguracionDeIPVisible,
        setModalConfiguracionDeIPVisible
    }), [numeroEmpleado, modalConfiguracionDeIPVisible]);

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