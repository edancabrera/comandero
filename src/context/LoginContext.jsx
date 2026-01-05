import { createContext, useContext } from "react";

const LoginContext = createContext(null);

export const LoginProvider = ({children}) => {

    return (
        <LoginContext.Provider value={{}}>
            {children}
        </LoginContext.Provider>
    )
} 

export const useLogin = () => {
    const context = useContext(LoginContext);
    if(!context) throw new Error('useLogin debe utilizarse dentro de LoginProvider');
    return context;
}