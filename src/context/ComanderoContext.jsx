import { useState, useContext, createContext, useMemo} from 'react';
import { buildApiUrl } from '../utils/apiConfig';

//Creación del contexto
const ComanderoContext = createContext(null);

//Provider
export const ComanderoProvider = ({children}) => {

    const [usuario, setUsuario] = useState(null); //objeto con la información del usuario

    const [areaSeleccionada, setAreaSeleccionada] = useState(null); //objeto con la información de la area seleccionada
    const [mesaSeleccionada, setMesaSeleccionada] = useState(null); // objeto con la infromación de la mesa seleccionada
    const [menuSeleccionado, setMenuSeleccionado] = useState(null); // cadena con la información del menú seleccionado
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null); //objeto con la información de la categoría seleccionada
    const [pedido, setPedido] = useState([]); //arreglo con la información del pedido
    const [lineaPedidoSeleccionadaId, setLineaPedidoSeleccionadaId] = useState(null);//Estado con la información de la linea seleccionada del pedido en la tabla
    const [personas, setPersonas] = useState([1]); //Arreglo de personas a las que se les está tomando el pedido
    const [personaActiva, setPersonaActiva] = useState(1); //Estado para controlar qué persona de la mesa es a la que se le está tomando el pedido

    const [modalBorrarPedidoVisible, setModalBorrarPedidoVisible] = useState(false);//Estado para controlar la visibilidad de la modal para confirmar el borrar un pedido en pedido.jsx (Confirma o aborta el borrado de todos los platillos de la tabla del pedido)
    const [modalQuitarPlatilloVisible, setModalQuitarPlatilloVisible] = useState(false);//Estado para controlar la visibilidad de la modal para confirmar el quitar un platillo seleccionado de la tabla del pedido
    const [modalSalirDeLaComanda, setModalSalirDeLaComanda] = useState(false);
    const [modalOpcionesDeMesaVisible, setModalOpcionesDeMesaVisible] = useState(false);
    const [modalComplementosVisible, setModalComplementosVisible] = useState(false); //Estado para controlar la visibilidad de modalComplementos
    const [modalEnviarACocinaVisible, setModalEnviarACocinaVisible] = useState(false);
    const [modalComandaVaciaVisible, setModalComandaVaciaVisible] = useState(false);
    

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
        setPedido(prevPedido => {
            // Buscar si ya existe el platillo para esa persona
            const lineaExistente = prevPedido.find( item => item.idPlatillo === platillo.idProducto && item.persona === personaActiva );

            // Si existe → aumentar cantidad
            if (lineaExistente) {
            return prevPedido.map(item =>
                item.idLinea === lineaExistente.idLinea
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
            );}

            // Si no existe → crear nueva línea
            return [
                {
                    idLinea: Date.now().toString() + Math.random().toString(36).substring(2), //Generación de un id único para indentificar el platillo
                    idPlatillo: platillo.idProducto,
                    nombre: platillo.nombre,
                    persona: personaActiva,
                    cantidad: 1,
                    comentarios: "",
                    idCategoriaPlatillo: platillo.idCategoriaPlatillo
                },
                ...prevPedido
            ];
        });
    };

    const seleccionarLineaPedido = (idLinea) => {
        setLineaPedidoSeleccionadaId(idLinea);
    };

    const eliminarLineaPedidoSeleccionada = () => {
        if (!lineaPedidoSeleccionadaId) return;

        setPedido(prev =>
            prev.filter(item => item.idLinea !== lineaPedidoSeleccionadaId)
        );

        setLineaPedidoSeleccionadaId(null);
    };

    const agregarComentarioLinea = (comentario) => {
        if (!lineaPedidoSeleccionadaId) return;

        setPedido(prev =>
            prev.map(item =>
            item.idLinea === lineaPedidoSeleccionadaId
                ? { ...item, comentarios: comentario }
                : item
            )
        );
    };

    const borrarComentarioLinea = () => {
        if (!lineaPedidoSeleccionadaId) return;

        setPedido(prev =>
            prev.map(item =>
            item.idLinea === lineaPedidoSeleccionadaId
                ? { ...item, comentarios: "" }
                : item
            )
        );
    }

    const agregarPersona = () => {
        setPersonas(prev => {
            const nueva = prev.length + 1;
            setPersonaActiva(nueva);
            return [...prev, nueva];
        })
    }

    const seleccionarPersona = (num) => {
        setPersonaActiva(num);
    }

    const restablecerArregloPersonas = () =>{
        setPersonas([1])
    }

    const enviarComanda = async () => {
        if(!mesaSeleccionada) return;
        if(!pedido.length){
            console.log('No se han añadido platillos al pedido');
            return
        }

        const detalles = pedido.map(linea => ({
            idPlatillo: linea.idPlatillo,
            cantidad: linea.cantidad,
            persona: linea.persona,
            comentarios: linea.comentarios
        }));

        const payload = {
            idMesa: mesaSeleccionada.id,
            idMesero: usuario.idu,
            detalles
        }

        try {
            const url = await buildApiUrl("/comanda");
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            if(!response.ok){
                throw new Error ('Error en la respuesta del servidor');
            }
            const data = await response.json();
            console.log(data);
            seleccionarArea(null);
            seleccionarMesa(null);
            seleccionarMenu(null);
            seleccionarCategoria(null);
            borrarPedido();
            seleccionarLineaPedido(null);
            seleccionarPersona(1);
            restablecerArregloPersonas([1]);
        } catch (error) {
            console.error('Error al enviar la comanda', error);
        }
    }

    //Memoización del value para evitar re-renders
    const value = useMemo(()=>({
        usuario,
        setUsuario,

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

        lineaPedidoSeleccionadaId,
        seleccionarLineaPedido,
        eliminarLineaPedidoSeleccionada,
        agregarComentarioLinea,
        borrarComentarioLinea,

        personas,
        personaActiva,
        agregarPersona,
        seleccionarPersona,
        restablecerArregloPersonas,

        enviarComanda,

        modalBorrarPedidoVisible,
        setModalBorrarPedidoVisible,
        modalQuitarPlatilloVisible,
        setModalQuitarPlatilloVisible,
        modalSalirDeLaComanda, 
        setModalSalirDeLaComanda,

        modalOpcionesDeMesaVisible, 
        setModalOpcionesDeMesaVisible,

        modalComplementosVisible, 
        setModalComplementosVisible,

        modalEnviarACocinaVisible, 
        setModalEnviarACocinaVisible,
        modalComandaVaciaVisible, 
        setModalComandaVaciaVisible
    }), [usuario, areaSeleccionada, mesaSeleccionada, menuSeleccionado, categoriaSeleccionada, pedido, lineaPedidoSeleccionadaId, modalBorrarPedidoVisible, modalQuitarPlatilloVisible, modalSalirDeLaComanda,modalOpcionesDeMesaVisible, personas, personaActiva, modalComplementosVisible, modalEnviarACocinaVisible, modalComandaVaciaVisible])

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