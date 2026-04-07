import { createContext, useCallback, useContext, useMemo, useState } from "react";

export const MODALS = {
    BORRAR_PEDIDO: 'borrarPedido',
    QUITAR_PLATILLO: 'quitarPlatillo',
    SALIR_COMANDA: 'salirDeLaComanda',
    OPCIONES_MESA: 'opcionesDeMesa',
    COMPLEMENTOS: 'complementos',
    ENVIAR_COCINA: 'enviarACocina',
    ENVIAR_URGENTE: 'enviarACocinaUrgente',
    COMANDA_SIN_CAMBIOS: 'comandaSinCambios',
    ENVIAR_Y_COBRAR: 'enviarYCobrar',
    COMANDA_VACIA: 'comandaVacia',
    MESA_UNIDA: 'mesaUnida',
    EDITAR_MESA: 'editarMesa',
    DESUNION_MESAS: 'desunionMesas',
    UNION_MESAS: 'unionMesas',
    CAMBIO_MESA: 'cambioMesa',
    VER_CUENTA: 'verCuenta',
    CANCELAR_COMANDA: 'cancelarComanda',
    DIVIDIR_COMANDA: 'dividirComanda',
    ERROR_IMPRESORA: 'errorConfiguracionImpresora',
    VERIFICAR_ESTATUS_MESA: 'verificarEstatusMesa',
    CERRAR_SESION: 'cerrarSesion',

    LOGIN_ERROR: 'loginError',
    CONFIG_IP: 'configuracionDeIp'
};

export const LOADINGS = {
    OPCIONES_MESA: 'opcionesDeMesaLoading',
    ENVIAR_O_COBRAR_COMANDA: 'enviarOCobrarComanda'
}

const initialModals = Object.values(MODALS).reduce((acc, key) => {
    acc[key] = false;
    return acc;
}, {});

const initialLoadings = Object.values(LOADINGS).reduce((acc, key) => {
    acc[key] = false;
    return acc;
}, {});

const UIContext = createContext(null);

export const UIProvider = ({ children }) => {
    const [descripcionMesa, setDescripcionMesa] = useState("");

    const [printConfErrorMsg, setPrintConfErrorMsg] = useState("");

    const [modals, setModals] = useState(initialModals);
    const [loadings, setLoadings] = useState(initialLoadings);

    const openModal = useCallback((name) => {
        setModals(prev => ({ ...prev, [name]: true }));
    }, []);

    const closeModal = useCallback((name) => {
        setModals(prev => ({ ...prev, [name]: false }));
    }, []);

    const toggleModal = useCallback((name) => {
        setModals(prev => ({ ...prev, [name]: !prev[name] }));
    }, []);

    const startLoading = useCallback((name) => {
        setLoadings(prev => ({ ...prev, [name]: true }));
    })

    const finishLoading = useCallback((name) => {
        setLoadings(prev => ({ ...prev, [name]: false }));
    })


    const value = useMemo( () => ({
        modals,
        openModal,
        closeModal,
        toggleModal,
        loadings,
        startLoading,
        finishLoading,
        descripcionMesa, setDescripcionMesa,
        printConfErrorMsg, setPrintConfErrorMsg,
    }), [modals, openModal, closeModal, toggleModal, descripcionMesa, printConfErrorMsg, loadings, startLoading, finishLoading ]);

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