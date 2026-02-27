import { useState, useContext, createContext, useMemo} from 'react';
import { useRouter } from 'expo-router';
import { buildApiUrl } from '../utils/apiConfig';

//Creación del contexto
const ComanderoContext = createContext(null);

//Provider
export const ComanderoProvider = ({children}) => {
    const router = useRouter();

    const [usuario, setUsuario] = useState(null); //objeto con la información del usuario

    const [areaSeleccionada, setAreaSeleccionada] = useState(null); //objeto con la información de la area seleccionada
    const [mesaSeleccionada, setMesaSeleccionada] = useState(null); // objeto con la infromación de la mesa seleccionada
    const [menuSeleccionado, setMenuSeleccionado] = useState(null); // cadena con la información del menú seleccionado
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null); //objeto con la información de la categoría seleccionada
    const [pedido, setPedido] = useState([]); //arreglo con la información del pedido
    const [pedidoOriginal, setPedidoOriginal] = useState([]); //En este arregló se guardarán los detalles de una comanda, justo como el estado 'pedido', pero esté no mutará, sino que se utilizará para comparar cómo cambió el pedido obtenido de la API a diferencia de cuando se envía.
    const [lineaPedidoSeleccionadaId, setLineaPedidoSeleccionadaId] = useState(null);//Estado con la información de la linea seleccionada del pedido en la tabla
    const [detallesAEliminar, setDetallesAEliminar] = useState([]); //Objeto que almacena los platillos de un pedido cuya propiedad estatusCocina === 1 (es decir, que ya están registrados en la bd) y fueron seleccionados para eliminarse del pedido
    const [personas, setPersonas] = useState([1]); //Arreglo de personas a las que se les está tomando el pedido
    const [personaActiva, setPersonaActiva] = useState(1); //Estado para controlar qué persona de la mesa es a la que se le está tomando el pedido

    const [descripcionMesa, setDescripcionMesa] = useState("");

    const [pedidoACancelarEnviadoACocina, setPedidoACancelarEnviadoACocina] = useState(false);

    const [modalBorrarPedidoVisible, setModalBorrarPedidoVisible] = useState(false);//Estado para controlar la visibilidad de la modal para confirmar el borrar un pedido en pedido.jsx (Confirma o aborta el borrado de todos los platillos de la tabla del pedido)
    const [modalQuitarPlatilloVisible, setModalQuitarPlatilloVisible] = useState(false);//Estado para controlar la visibilidad de la modal para confirmar el quitar un platillo seleccionado de la tabla del pedido
    const [modalSalirDeLaComanda, setModalSalirDeLaComanda] = useState(false);
    const [modalOpcionesDeMesaVisible, setModalOpcionesDeMesaVisible] = useState(false);
    const [modalComplementosVisible, setModalComplementosVisible] = useState(false); //Estado para controlar la visibilidad de modalComplementos
    const [modalEnviarACocinaVisible, setModalEnviarACocinaVisible] = useState(false);
    const [modalComandaVaciaVisible, setModalComandaVaciaVisible] = useState(false);
	const [modalMesaUnidaVisible, setModalMesaUnidaVisible] = useState(false);
    const [modalEdiarMesaVisible, setModalEditarMesaVisible] = useState(false);
    const [modalAccionesMesaDesunionDeMesasVisible, setModalAccionesMesaDesunionDeMesasVisible] = useState(false);
    const [modalAccionesMesaUnionDeMesaVisible, setModalAccionesMesaUnionDeMesaVisible] = useState(false);
    const [modalAccionesMesaCambioDeMesaVisible, setModalAccionesMesaCambioDeMesaVisible] = useState(false);
    const [modalVerCuentaVisible, setModalVerCuentaVisible] = useState(false);
    const [modalCancelarComandaVisible, setModalCancelarComandaVisible] = useState(false);
    

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
        setPedido(prevPedido => {
            prevPedido.forEach(linea => {
                if(linea.estatusCocina === 1){
                    setDetallesAEliminar(prev => [...prev, linea]);
                    console.log("Detalle marcado para eliminación:", linea);
                }                
            });
            return [];
        });
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
                    idCategoriaPlatillo: platillo.idCategoriaPlatillo,
                    nombreCategoriaPlatillo: platillo.nombreCategoria,
                    menu: platillo.menu,
                    estatusCocina: 0
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

        setPedido(prevPedido =>{
            const linea = prevPedido.find(
                item => item.idLinea === lineaPedidoSeleccionadaId
            );

            if(!linea) return prevPedido;

            if (linea.estatusCocina === 1) {
                setDetallesAEliminar(prev => [...prev, linea]);
                console.log("Detalle marcado para eliminación: ", linea);
            }
            return prevPedido.filter(
                item => item.idLinea !== lineaPedidoSeleccionadaId
            );
        });

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
        if(!pedido.length && !detallesAEliminar.length){
            console.log('No hay cambios que enviar');
            return
        }

        try {
            if(detallesAEliminar.length > 0){
                const idsDetalles = detallesAEliminar
                    .map(d => d.id);
                if(idsDetalles.length > 0){
                    const urlDelete = await buildApiUrl("/comanda/detalle");
                    const responseDelete = await fetch(urlDelete, {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(idsDetalles)
                    });

                    if(!responseDelete.ok){
                        throw new Error("Error al eliminar detalles");
                    }
                }
            }

            if(pedido.length > 0){
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
                const url = await buildApiUrl("/comanda");
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });
                if(!response.ok){
                    throw new Error ('Error al enviar la comandar');
                }

                const agregados = []; //arreglo para guardar los objetos detalle nuevos
                const nuevos = pedido.filter(detalle => !detalle.id); //Si el detalle en el pedido no tiene propiedad id, significa que es un detalle nuevo
                agregados.push(...nuevos);
                pedido.forEach(detalle => {
                    if(!detalle.id) return;
                    const original = pedidoOriginal.find(d => d.id === detalle.id);
                    if(!original) return;
                    const diferencia = detalle.cantidad - original.cantidad; //Calculamos únicamente la diferencia contra el estado original para mostrar a cocina lo que se agregó al modificar el pedido

                    if(diferencia > 0){
                        agregados.push({
                            ...detalle,
                            cantidad: diferencia //Obtenemos sólo la cantidad agregada
                        });
                    }
                });

                const pedidoOrdenado = ordenarPedidoPorMenuOCategoriaYPorPersona(agregados);
                if(Object.keys(pedidoOrdenado).length > 0){
                    const payloadTicket = construirPayloadTicket( pedidoOrdenado, "AGREGADOS" );
                    await enviarTicket(payloadTicket);
                }

                if (detallesAEliminar.length > 0){
                    const detallesCanceladosOrdenados = ordenarPedidoPorMenuOCategoriaYPorPersona(detallesAEliminar);
                    const payloadCancelacion = construirPayloadTicket( detallesCanceladosOrdenados, "CANCELACION" );
                    await enviarTicket(payloadCancelacion);
                }
            }

            seleccionarMesa(null);
            seleccionarMenu(null);
            seleccionarCategoria(null);
            setPedido([]);
            seleccionarLineaPedido(null);
            seleccionarPersona(1);
            restablecerArregloPersonas([1]);
            setDetallesAEliminar([]);
            setPedidoOriginal([]);
            router.replace("/dashboard/mesas");
        } catch (error) {
            console.error('Error al sincronizar comanda', error);
        }
    }

    const cancelarComanda = async () => {
        if(pedidoACancelarEnviadoACocina){
            try {
                const url = await buildApiUrl(`/comanda/mesa/${mesaSeleccionada.id}/cancelar/${usuario.idu}`);
                const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if(!response.ok){
                throw new Error ('Error en la respuesta del servidor');
            }
                
            } catch (error) {
                console.error('Error al cancelar la comanda', error);
            }

        }
            seleccionarMesa(null);
            seleccionarMenu(null);
            seleccionarCategoria(null);
            setPedido([]);
            seleccionarLineaPedido(null);
            seleccionarPersona(1);
            restablecerArregloPersonas([1]);
            router.replace("/dashboard/mesas");
    }

    const abrirComandaMesa = async () => {
        try {
            const url = await buildApiUrl(`/comanda/mesa/${mesaSeleccionada.id}`);
            const response = await fetch(url);

            if(!response.ok) {
                throw new Error("La mesa no tiene comanda activa")
            }

            const detalleComanda = await response.json();

            const detalleMapped = detalleComanda.detalles.map(detalle => ({
                id: detalle.id,
                idComanda: detalle.idComanda,
                idLinea: Date.now().toString() + Math.random().toString(36).substring(2),
                idPlatillo: detalle.idPlatillo,
                nombre: detalle.nombre,
                persona: detalle.persona,
                cantidad: detalle.cantidad,
                comentarios: detalle.comentarios ?? "",
                idCategoriaPlatillo: detalle.idCategoriaPlatillo,
                nombreCategoriaPlaitllo: detalle.nombreCategoria,
                menu: detalle.menu,
                estatusCocina: detalle.estatusCocina
            }));

            setPedido(detalleMapped);
            setPedidoOriginal(detalleMapped);
						
						setPersonas([...new Set 
							(detalleComanda.detalles
								.map(detalle => detalle.persona)
								.sort((a, b) => a - b)
							)]);

            router.replace("/dashboard/comandero");
        } catch (error) {
            console.error("Error al obtener comanda", error);
        }
    }

    const ordenarPedidoPorMenuOCategoriaYPorPersona = (pedido) => {
        return pedido.reduce((acc, detalle) => {
            const categoria = detalle.nombreCategoriaPlatillo?.trim().toUpperCase();
            const menu = detalle.menu?.trim().toUpperCase();
            const persona = detalle.persona;

            const claveRaiz = categoria === "ZARANDEADOS" 
                ? "ZARANDEADOS"
                : menu;
            
            if(!acc[claveRaiz]) {
                acc[claveRaiz] = {};
            }

            if(!acc[claveRaiz][persona]) {
                acc[claveRaiz][persona] = [];
            }

            acc[claveRaiz][persona].push({
                persona: detalle.persona,
                cantidad: detalle.cantidad,
                nombre: detalle.nombre,
                menu: categoria === "ZARANDEADOS" 
                    ? "ZARANDEADOS"
                    : menu,
                comentarios: detalle.comentarios
            });

            return acc;
        }, {}); 
    }

    const construirPayloadTicket = (detalleOrdenado, tipo) => {
        return {
            tipo, // "AGREGADOS" o "CANCELACION"
            mesa: `${mesaSeleccionada.nombre} - ${areaSeleccionada.nombre}`,
            mesero: usuario.nombre,
            fecha: new Date().toLocaleString(),
            detalle: detalleOrdenado
        };
    };

    const enviarTicket = async (payload) => {
        try {
            const url = await buildApiUrl('/ticket');
            const response = await fetch(url, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if(!response.ok){
                throw new Error ("Error al enviar ticket");
            }

        } catch (error) {
            console.error("Error en enviarTicket:", error);
            throw error;
        }
    };

    const reimprimirTicket = async () => {
        try {
            const urlDetalles = await buildApiUrl(`/comanda/mesa/${mesaSeleccionada.id}`);
            const response = await fetch(urlDetalles);
            if(!response.ok) {
                throw new Error ("La mesa no tiene comanda activa");
            }
            const detalleComanda = await response.json();
            const detalleMapped = detalleComanda.detalles.map(detalle => ({
                id: detalle.id,
                idComanda: detalle.idComanda,
                idPlatillo: detalle.idPlatillo,
                nombre: detalle.nombre,
                persona: detalle.persona,
                cantidad: detalle.cantidad,
                comentarios: detalle.comentarios ?? "",
                idCategoriaPlatillo: detalle.idCategoriaPlatillo,
                nombreCategoriaPlatillo: detalle.nombreCategoria,
                menu: detalle.menu,
                estatusCocina: detalle.estatusCocina
            }));

            const pedidoOrdenado = ordenarPedidoPorMenuOCategoriaYPorPersona(detalleMapped);
            const ticketPayload = construirPayloadTicket(pedidoOrdenado, "REIMPRESION");

            await enviarTicket(ticketPayload);
            
            seleccionarMesa(null);
            setModalOpcionesDeMesaVisible(false);
        } catch (error) {
            console.error("Error en la reimpresión: ", error);
        }
    };

    //Método a llamar al presionar el botón VER CUENTA en la modal modalOpcionesDeMesa
    const crearCuenta = async () => {
        try {
            const url = await buildApiUrl(`/comanda/mesa/${mesaSeleccionada.id}`);

            const response = await fetch(url);

            if(!response.ok) {
                throw new Error("La mesa no tiene comanda activa")
            }
            
            const detalleComanda = await response.json();

            const separador = "=================================";

            const lineas = detalleComanda.detalles.map(detalle => {
                const subtotal = detalle.cantidad * detalle.precio;
                return `${detalle.cantidad} ${detalle.nombre.trim()} $${subtotal.toFixed(2)}`;
            });

            const cuenta = [
                separador,
                ...lineas,
                separador,
                `TOTAL: $${detalleComanda.total.toFixed(2)}`,
                separador,
                'Colocar aquí el TOTAL en números, eventualmente',
                separador
            ].join("\n");

            return cuenta;

        } catch (error) {
            console.error("Error al obtener la cuenta", error);
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
        setPedido,
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
        abrirComandaMesa,
        reimprimirTicket,

        cancelarComanda,

        crearCuenta,

        descripcionMesa, 
        setDescripcionMesa,

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
        setModalComandaVaciaVisible,

        modalMesaUnidaVisible, 
		setModalMesaUnidaVisible,

        modalEdiarMesaVisible, 
        setModalEditarMesaVisible,

        modalAccionesMesaDesunionDeMesasVisible, 
        setModalAccionesMesaDesunionDeMesasVisible,
        modalAccionesMesaUnionDeMesaVisible, 
        setModalAccionesMesaUnionDeMesaVisible,
        modalAccionesMesaCambioDeMesaVisible,
        setModalAccionesMesaCambioDeMesaVisible,

        modalVerCuentaVisible, 
        setModalVerCuentaVisible,

        modalCancelarComandaVisible, setModalCancelarComandaVisible,
        pedidoACancelarEnviadoACocina, setPedidoACancelarEnviadoACocina
    }), [usuario, areaSeleccionada, mesaSeleccionada, menuSeleccionado, categoriaSeleccionada, pedido, lineaPedidoSeleccionadaId, modalBorrarPedidoVisible, modalQuitarPlatilloVisible, modalSalirDeLaComanda,modalOpcionesDeMesaVisible, personas, personaActiva, modalComplementosVisible, modalEnviarACocinaVisible, modalComandaVaciaVisible, modalMesaUnidaVisible, modalEdiarMesaVisible, descripcionMesa, modalAccionesMesaDesunionDeMesasVisible, modalAccionesMesaUnionDeMesaVisible, modalAccionesMesaCambioDeMesaVisible, modalVerCuentaVisible, modalCancelarComandaVisible, pedidoACancelarEnviadoACocina])

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