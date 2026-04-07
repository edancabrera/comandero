import { useState, useEffect } from "react";
import { useComandero } from "../../../context/ComanderoContext";
import { useUI, MODALS } from "../../../context/UIContext";
import { StyleSheet, Text, View, ScrollView, Pressable, TextInput } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";

const Pedido = () => {
  const { 
    pedido, 
    lineaPedidoSeleccionadaId, 
    seleccionarLineaPedido, 
    agregarComentarioLinea, 
    borrarComentarioLinea, 
    personas, 
    personaActiva, 
    agregarPersona, 
    seleccionarPersona
  } = useComandero();

  const { openModal } = useUI();

  const [comentario, setComentario] = useState("");

  const [dropDownPersonasOpen, setDropDownPersonasOpen] = useState(false);

  useEffect(() => {
    if (!lineaPedidoSeleccionadaId) {
      setComentario("");
      return;
    }
    const linea = pedido.find(
      item => item.idLinea === lineaPedidoSeleccionadaId
    );
    setComentario(linea?.comentarios || "");
  }, [lineaPedidoSeleccionadaId, pedido]);

  return (
    
    <View style={{flex:1 /* Parte superior (Tabla completa: Encabezado, filas) */}}>
      <View style={{flex:1, backgroundColor: '#fff' /* Tabla */}}>
        <View style={styles.tableHeader}>
          <Text style={styles.colPersona}>Persona</Text>
          <Text style={styles.colPlatillo}>Platillo</Text>
          <Text style={styles.colCantidad}>Cant.</Text>
          <Text style={styles.colComentarios}>Comentarios</Text>
        </View>

        <ScrollView style={{/* Filas */}}>
          {pedido.sort((a,b) => a.persona - b.persona)?.map(item => (
            <Pressable 
              key={item.idLinea} 
              style={[
                styles.tableRow,
                item.idLinea === lineaPedidoSeleccionadaId && styles.rowSelected
              ]}
              onPress={() => seleccionarLineaPedido(item.idLinea)}
            >
              <Text style={styles.colPersona}>{item.persona}</Text>
              <Text 
                style={styles.colPlatillo}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.nombre}
              </Text>
              <Text style={styles.colCantidad}>{item.cantidad}</Text>
              <Text 
                style={styles.colComentarios} 
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.comentarios}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View style={{flex:1, /* Parte Inferior (Botones de la taba, sección de comentario y sus botones) */}}> 
        {/* Botones*/}
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
          <Pressable 
            onPress={()=> {
              if(pedido.length <= 0) return;
              openModal(MODALS.BORRAR_PEDIDO);
            }}

            style={({ pressed }) => ([
              styles.button,
              { backgroundColor: pressed ? 'red' : '#2596be' },
              pedido.length === 0 && styles.buttonDisabled
            ])}

            disabled={pedido.length === 0}
          >
            {({ pressed }) => (
              <Ionicons 
                name="trash-outline" 
                size={24} 
                color={pressed ? "#fff" : '#000'}
              />
            )}
          </Pressable>
          <Pressable
            onPress={() => {
              if(pedido.length === 0) return;
              openModal(MODALS.COMPLEMENTOS)
            }}

            style={({ pressed }) => ([
              styles.button,
              { backgroundColor: pressed ? 'green' : '#2596be' },
              !lineaPedidoSeleccionadaId && styles.buttonDisabled
            ])}

            disabled={!lineaPedidoSeleccionadaId}
          >
            {({ pressed }) => (
              <MaterialCommunityIcons
                name="food-variant"
                size={24}
                color={pressed ? "#fff" : '#000'}
              />
            )}
          </Pressable>
          <View>
            <DropDownPicker 
              open = {dropDownPersonasOpen}
              value = {personaActiva}
              items = {personas.map(persona => ({ label:persona, value: persona}))}
              setOpen={setDropDownPersonasOpen}
              setValue={seleccionarPersona}
              placeholder={personaActiva}
              dropDownDirection="BOTTOM" 
              style={{
                backgroundColor: "#fff",
                borderColor: "#ccc",
                minHeight: 20,
                width: 80,
                paddingVertical: 7,
              }}
              dropDownContainerStyle={{
                borderColor: "#ccc",
                maxHeight: 120,
                width: 80, 
              }}
              textStyle={{
                fontSize: 14
              }}
            />
          </View>
          <Pressable 
            onPress={()=>{agregarPersona()}}

            style={({ pressed }) => ([
              styles.button,
              { backgroundColor: pressed ? 'green' : '#2596be' }
            ])}
          >
            {({ pressed }) => (
            <Feather 
              name="user-plus" 
              size={24} 
              color={pressed ? "#fff" : '#000'}
            />
          )}
          </Pressable>
          <Pressable 
          onPress={()=> {
            if(!lineaPedidoSeleccionadaId)return;
            openModal(MODALS.QUITAR_PLATILLO);
          }}

          style={({ pressed }) => ([
            styles.button,
            { backgroundColor: pressed ? 'red' : '#2596be' },
            !lineaPedidoSeleccionadaId && styles.buttonDisabled
          ])}
          
          disabled={!lineaPedidoSeleccionadaId}
          >
            {({ pressed }) => (
              <AntDesign 
              name="close" 
              size={24} 
                color={pressed ? "#fff" : '#000'}
              />
            )}
          </Pressable>
        </View>

        <View style={{/*Input para comentarios */}}>
          <Text style={{ fontWeight: "bold" }}>Comentarios</Text>
          <TextInput 
            style={styles.inputComentarios}
            value={comentario}
            onChangeText={setComentario}
            placeholder="Agregar comentario..."
            editable={Boolean(lineaPedidoSeleccionadaId)}
          />
          <View
            style={{ flexDirection: "row", marginTop: 5 }}
          >
            <Pressable 
              style={({ pressed }) => ([
                styles.button,
                {
                  marginLeft: 0,
                  paddingVertical: 1,
                  backgroundColor: pressed ? 'green' : '#2596be'
                },
                !comentario && styles.buttonDisabled
              ])}
              onPress={() => {
                if (!lineaPedidoSeleccionadaId) return;
                if (!comentario.trim()) return;
                agregarComentarioLinea(comentario);
                setComentario("");
              }}

              disabled={!comentario}
            >
              {({ pressed }) => (
                <>
                  <Feather 
                    name="plus" 
                    size={24} 
                    color={!comentario ? 'grey': pressed ? "#fff" : 'green'}
                  />
                  <Text style={[
                    {marginLeft: 5, color: '#fff'},
                    !comentario && {color: 'grey'}
                  ]}>Agregar</Text>
                </>
              )}
            </Pressable>
            <Pressable 
              style={({ pressed }) => ([
                styles.button,
                {
                  marginRight: 0,
                  paddingVertical: 1,
                  backgroundColor: pressed ? 'red' : '#2596be' 
                },
                !comentario && styles.buttonDisabled
              ])}
              onPress={() => {
                if (!lineaPedidoSeleccionadaId || !comentario.trim()) return;
                borrarComentarioLinea();
                setComentario("");
              }}

              disabled={!comentario}
            >
              {({ pressed }) => (
                <>
                  <AntDesign 
                    name="close-circle" 
                    size={24} 
                    color={!comentario ? 'grey': pressed ? "#fff" : 'red'}
                  />
                  <Text style={[
                    {marginLeft: 5, color: '#fff'},
                    !comentario && {color: 'grey'}
                  ]}>Borrar</Text>
                </>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Pedido;

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: "#00000088",
    paddingVertical: 5,
    backgroundColor: "#fff",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 4,
    borderBottomWidth: .5,
    borderColor: "#00000088",
  },
  rowSelected: {
    backgroundColor: "#e0f2ff"
  },
  colPersona: {
    width: 60,
    fontWeight: "bold",
  },
  colPlatillo: {
    flex: 1,
  },
  colCantidad: {
    width: 50,
    textAlign: "center",
  },
  colComentarios: {
    flex: 1,
    color: "#aaa",
  },
  inputComentarios: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 5,
  },
  button:{
    flex: 1, 
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 5,
    paddingVertical: 5
  },
  buttonDisabled:{
    backgroundColor: '#0c485e'
  }
});
