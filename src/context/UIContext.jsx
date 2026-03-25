import { createContext, useCallback, useContext, useMemo, useState } from "react";

const UIContext = createContext(null);

export const UIProvider = ({ children }) => {
    const [modals, setModals] = useState({
        borrarPedido: false,
        quitarPlatillo: false,
        salirDeLaComanda: false,
        opcionesDeMesa: false,
        complementos: false,
        enviarACocina: false,
        enviarACocinaUrgente: false,
        enviarYCobrar: false,
        comandaVacia: false,
        mesaUnida: false,
        editarMesa: false,
        desunionMesas: false,
        unionMesas: false,
        cambioMesa: false,
        verCuenta: false,
        cancelarComanda: false,
        dividirComanda: false
    });

    const openModal = useCallback((name) => {
        setModals(prev => ({ ...prev, [name]: true }));
    }, []);

    const closeModal = useCallback((name) => {
        setModals(prev => ({ ...prev, [name]: false }));
    }, []);

    const toggleModal = useCallback((name) => {
        setModals(prev => ({ ...prev, [name]: !prev[name] }));
    }, []);

    const value = useMemo( () => ({
        modals,
        openModal,
        closeModal,
        toggleModal
    }));

    return (
        <UIContext.Provider value = {value}>
            {children}
        </UIContext.Provider>
    );
};

export const useUI = () => {
    const context = useContext(UIContext);
    if(!context) throw new Error('useUI debe usuarse dentro de UIProvider');
    return context;
}