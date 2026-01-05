import { createContext, useContext, useMemo, useState } from "react";

const LoginContext = createContext(null);

export const LoginProvider = ({children}) => {
    const [numeroEmpleado, setNumeroEmpleado] = useState("");

    const value = useMemo(() => ({
        numeroEmpleado,
        setNumeroEmpleado
    }), [numeroEmpleado]);

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