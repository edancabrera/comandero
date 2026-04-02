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
    const [pedidoOriginal, setPedidoOriginal] = useState([]); //En este arregló se guardarán los detalles de una comanda, justo como el estado 'pedido', pero esté no mutará, sino que se utilizará para comparar cómo cambió el pedido obtenido de la API a diferencia de cuando se envía.
    const [lineaPedidoSeleccionadaId, setLineaPedidoSeleccionadaId] = useState(null);//Estado con la información de la linea seleccionada del pedido en la tabla
    const [detallesAEliminar, setDetallesAEliminar] = useState([]); //Objeto que almacena los platillos de un pedido cuya propiedad estatusCocina === 1 (es decir, que ya están registrados en la bd) y fueron seleccionados para eliminarse del pedido
    const [personas, setPersonas] = useState([1]); //Arreglo de personas a las que se les está tomando el pedido
    const [personaActiva, setPersonaActiva] = useState(1); //Estado para controlar qué persona de la mesa es a la que se le está tomando el pedido

    const [pedidoACancelarEnviadoACocina, setPedidoACancelarEnviadoACocina] = useState(false);
    

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
        const nuevoIdLinea = Date.now().toString() + Math.random().toString(36).substring(2) //Generación de un id único para indentificar el platillo

        setPedido(prevPedido => {
            // Buscar si ya existe el platillo para esa persona
            const lineaExistente = prevPedido.find( item => item.idPlatillo === platillo.idProducto && item.persona === personaActiva );

            // Si existe → aumentar cantidad
            if (lineaExistente) {
                setLineaPedidoSeleccionadaId(lineaExistente.idLinea);

            return prevPedido.map(item =>
                item.idLinea === lineaExistente.idLinea
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
            );}

            // Si no existe → crear nueva línea
            setLineaPedidoSeleccionadaId(nuevoIdLinea);
            return [
                ...prevPedido,
                {
                    idLinea: nuevoIdLinea,
                    idPlatillo: platillo.idProducto,
                    nombre: platillo.nombre,
                    persona: personaActiva,
                    cantidad: 1,
                    comentarios: "",
                    idCategoriaPlatillo: platillo.idCategoriaPlatillo,
                    nombreCategoriaPlatillo: platillo.nombreCategoria,
                    menu: platillo.menu,
                    estatusCocina: 0,
                    iva: platillo.iva
                }
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


    const verificarImpresora = async (impresora) => {
        try {
            const url = await buildApiUrl(`/printer-configured?printerType=${impresora}`);

            const response = await fetch(url);

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.message || `Verificar la impresora de ${impresora}`);
            }
            
        } catch (error) {
            throw error
        }
    }

    //--- Enviar comanda: INICIO ---
    const enviarComanda = async (urgente = false) => {
        if(!validarEnvio()) return;

        try {
            await eliminarDetalles();
            
            const huboEnvio = await enviarDetalles();

            if(huboEnvio) {
                const agregados = calcularAgregados();
                await procesarTickets(agregados, urgente);
            }
            
        } catch (error) {
            console.error('Error al sincronizar comanda', error);
            throw error;
        }
    }

    const validarEnvio = () => {
        if(!mesaSeleccionada) return false;
        if(!pedido.length && !detallesAEliminar.length) return false;
        return true;
    }

    const eliminarDetalles = async () => {
        if(!detallesAEliminar.length) return;
        const idsDetalles = detallesAEliminar.map( d => d.id).filter(Boolean);
        if(!idsDetalles.length) return;

        const url = await buildApiUrl("/comanda/detalle");

        const response = await fetch(url, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(idsDetalles)
        });

        if(!response.ok) {
            throw new Error("Error al eliminar detalles");
        }
    }

    const enviarDetalles = async () => {
        if(!pedido.length) return false;
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
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if(!response.ok){
            throw new Error ('Error al enviar la comandar');
        }

        return true;
    }

    const calcularAgregados = () => {
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

        return agregados;
    }

    const procesarTickets = async (agregados, urgente) => {
        if(agregados.length > 0) {
            const ordenado = ordenarPedidoPorMenuOCategoriaYPorPersona(agregados);

            if(Object.keys(ordenado).length > 0) {
                const payload = construirPayloadTicket(ordenado, "AGREGADOS", urgente);
                await enviarTicket(payload);
            }
        }

        if(detallesAEliminar.length > 0) {
            const detallesCanceladosOrdenados = ordenarPedidoPorMenuOCategoriaYPorPersona(detallesAEliminar);
            
            const payloadCancelacion = construirPayloadTicket( detallesCanceladosOrdenados, "CANCELACION", urgente );
            
            await enviarTicket(payloadCancelacion);
        }
    }

    const limpiarEstado = () => {
        seleccionarMesa(null);
        seleccionarMenu(null);
        seleccionarCategoria(null);
        setPedido([]);
        seleccionarLineaPedido(null);
        seleccionarPersona(1);
        restablecerArregloPersonas([1]);
        setDetallesAEliminar([]);
        setPedidoOriginal([]);
    }
    //--- Enviar comanda: FIN ---[

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
                throw error;
            }

        }
    }

    const abrirComandaMesa = async () => {
        const detalleMapped = await obtenerComandaMesa();
        setPedido(detalleMapped)
        setPedidoOriginal(detalleMapped);
						
        setPersonas([...new Set 
            (detalleMapped
                .map(detalle => detalle.persona)
                .sort((a, b) => a - b)
            )]);
    }
    const obtenerComandaMesa = async () => {
        try {
            const detalleComanda = await obtenerComanda();

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
                nombreCategoriaPlatillo: detalle.nombreCategoria,
                menu: detalle.menu,
                estatusCocina: detalle.estatusCocina,
                iva: detalle.iva,
                precio: detalle.precio
            }));

            return detalleMapped;
            
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

    const construirPayloadTicket = (detalleOrdenado, tipo, urgente) => {
        return {
            tipo, // "AGREGADOS" o "CANCELACION"
            mesa: `${mesaSeleccionada.nombre} - ${areaSeleccionada.nombre}`,
            mesero: usuario.nombre,
            fecha: new Date().toLocaleString(),
            urgente: urgente,
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
            const detalleComanda = await obtenerComanda();
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
            const ticketPayload = construirPayloadTicket(pedidoOrdenado, "REIMPRESION", false);

            await enviarTicket(ticketPayload);
            
            seleccionarMesa(null);
        } catch (error) {
            console.error("Error en la reimpresión: ", error);
        }
    };

// --- Imprimir cuenta: INICIO ---
    const imprimirCuenta = async () => {
        try {
            const comanda = await obtenerComanda();

            const payload = construirPayloadCobro({
                comanda, 
                mesa: mesaSeleccionada, 
                area: areaSeleccionada, 
                usuario
            });

            await enviarCobro(payload);
        } catch (error) {
            console.error("Error ", error);  
            throw error;
        }
    }

    const obtenerComanda = async () => {
        const url = await buildApiUrl(`/comanda/mesa/${mesaSeleccionada.id}`);

        const response = await fetch(url);

        if(!response.ok){
            throw new Error("La mesa no tiene comanda activa")
        }

        return await response.json();
    }

    const construirPayloadCobro = ({ comanda, mesa, area, usuario}) => {
        if(!comanda?.detalles?.length){
            throw new Error("Comanda sin detalles");
        }

        return {
            mesero: usuario.nombre,
            mesa: `${mesa.nombre} - ${area.nombre}`,
            fecha: new Date().toLocaleString(),
            detalle: comanda.detalles.map(detalle => ({
                nombre: detalle.nombre,
                cantidad: detalle.cantidad,
                precioUnitario: detalle.precio,
                subtotal: detalle.cantidad * detalle.precio,
                iva: detalle.iva
            })),
            total: comanda.total.toFixed(2)
        }
    }

    const enviarCobro = async (payload) => {
        const url = await buildApiUrl(`/comanda/mesa/${mesaSeleccionada.id}/cobrar`);

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if(!response.ok) {
            throw new Error("Error al mandar a cobrar")
        }
    }
// --- Imprimir cuenta: FIN ---

    const enviarComandaACocinaYCobrarCuenta = async () => {
        try {
            await enviarComanda();
            await imprimirCuenta();
        } catch (error) {
            console.error("Error en flujo de cobrar cuenta:", error);
        throw error;
        }
    }

    const verificarEstatusMesa = async (idMesa) => {
        const url = await buildApiUrl(`/mesas/${idMesa}/verificar-estatus`)
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error("Error al verificar disponibilidad")
        }
        const data = await response.json();
        return data;
    }

    //Método a llamar al presionar el botón VER CUENTA en la modal modalOpcionesDeMesa
    const crearCuenta = async () => {
        try {
            const detalleComanda = await obtenerComanda();

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
        obtenerComandaMesa,
        abrirComandaMesa,
        reimprimirTicket,
        imprimirCuenta,
        limpiarEstado,
        enviarComandaACocinaYCobrarCuenta,
        verificarImpresora,
        verificarEstatusMesa,
        calcularAgregados,
        detallesAEliminar,

        cancelarComanda,

        crearCuenta,

        pedidoACancelarEnviadoACocina, setPedidoACancelarEnviadoACocina
        
    }), [usuario, areaSeleccionada, mesaSeleccionada, menuSeleccionado, categoriaSeleccionada, pedido, lineaPedidoSeleccionadaId, personas, personaActiva, pedidoACancelarEnviadoACocina])

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