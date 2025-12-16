import { useState, useContext, createContext, useMemo} from 'react';

//Creación del contexto
const ComanderoContext = createContext(null);

//Provider
export const ComanderoProvider = ({children}) => {

    const [areaSeleccionada, setAreaSeleccionada] = useState(null); //objeto con la información de la area seleccionada
    const [mesaSeleccionada, setMesaSeleccionada] = useState(null); // objeto con la infromación de la mesa seleccionada
    const [menuSeleccionado, setMenuSeleccionado] = useState(null); // cadena con la información del menú seleccionado
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null); //objeto con la información de la categoría seleccionada
    const [pedido, setPedido] = useState([]); //arreglo con la información del pedido

    const [modalBorrarPedidoVisible, setModalBorrarPedidoVisible] = useState(false);//Estado para controlar la visibilidad de la modal para confirmar el borrar un pedido en pedido.jsx (Confirma o aborta el borrado de todos los platillos de la tabla del pedido)

    //Funciones para manipular el estado
    const seleccionarArea = (area) => {
        setAreaSeleccionada(area);
        setMesaSeleccionada(null);//Cada que seleccionamos un área, se resetea la mesa seleccionada
    }

    const seleccionarMesa = (mesa) => {
        setMesaSeleccionada(mesa);
    }

    const seleccionarMenu = (menu) => {
        setMenuSeleccionado(menu);
        setCategoriaSeleccionada(null);//Cada que seleccionamos un meú, se resetea la categoría seleccionada
    }

    const seleccionarCategoria = (categoria) => {
        setCategoriaSeleccionada(categoria);
    }

    const borrarPedido = () => {
        setPedido([]);
    }

    const agregarPlatillo = (platillo) => {
        setPedido((prevPedido) => {
            const existe = prevPedido.find(
            (item) => item.id === platillo.idproducto
            );

            // Si ya existe → sumar cantidad
            if (existe) {
            return prevPedido.map((item) =>
                item.id === platillo.idproducto
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
            );
            }

            // Si no existe → agregar nuevo
            return [
            ...prevPedido,
            {
                id: platillo.idproducto,
                nombre: platillo.nombre,
                persona: 1,
                cantidad: 1,
                comentarios: ""
            }
            ];
        });
    };


    //Memoización del value para evitar re-renders
    const value = useMemo(()=>({
        areaSeleccionada,
        seleccionarArea,
        mesaSeleccionada,
        seleccionarMesa,
        menuSeleccionado, 
        seleccionarMenu,
        categoriaSeleccionada,
        seleccionarCategoria,
        pedido,
        agregarPlatillo, 
        borrarPedido,

        modalBorrarPedidoVisible,
        setModalBorrarPedidoVisible
    }), [areaSeleccionada, mesaSeleccionada, menuSeleccionado, categoriaSeleccionada, pedido, modalBorrarPedidoVisible])

    return (
        <ComanderoContext.Provider value={value}>
            {children}
        </ComanderoContext.Provider>
    )
}

//custom hook para importaciones más limpias en los componentes
export const useComandero = () => {
    const context = useContext(ComanderoContext);
    if(!context) throw new Error('useComandero debe utilizarse dentro de ComanderoProvider');
    return context;
}