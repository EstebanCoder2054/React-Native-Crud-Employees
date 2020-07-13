import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { TextInput, Headline, Button, Paragraph, Dialog, Portal } from "react-native-paper";
// import axios from 'axios';

import globalStyles from "../styles/global";

const NuevoCliente = () => {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [error, setError] = useState(false);

  const guardarCliente =  () => {
    // validar
    if (
      nombre.trim() === "" ||
      telefono.trim() === "" ||
      correo.trim() === "" ||
      empresa.trim() === ""
    ) {
        setError(true);
        return;
    }

    // generar el cliente
    const cliente = {
        nombre,
        telefono,
        correo,
        empresa
    }

    // guardar el cliente en la API
    try {
        console.log('SE HA ENTRADO AL TRY');
        if(Platform.OS === 'android'){
            console.log('SE HA ENTRADO AL ANDROID');
            // forma de trabajar con android
            // await fetch.pos('http://10.0.2.2:3000/clientes', cliente);
            fetch('http://10.0.2.2:3000/clientes', {
                method: 'POST', 
                body: cliente, 
                headers:{
                  'Content-Type': 'application/json'
                }
              }).then(res => res.json())
              .then(response => console.log('Success:', response))
              .catch(error => console.error('Error:', error))
        }else{
        console.log('SE HA ENTRADO AL APPLE');
            // forma de trabajr con IOS
            // await axios.post('http://localhost:3000/clientes', cliente);
        }
    } catch (error) {
        console.log('SE HA ENTRADO AL CATCH-ERROR');
        console.log(error);
    }

    // redireccionar

    // limpiar el form
  };

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>Añadir nuevo cliente</Headline>

      <TextInput
        style={styles.input}
        label="Nombre"
        placeholder="ej. Esteban"
        onChangeText={(valorTexto) => setNombre(valorTexto)}
        value={nombre}
      />
      <TextInput
        style={styles.input}
        label="Teléfono"
        placeholder="ej. 12345"
        onChangeText={(valorTexto) => setTelefono(valorTexto)}
        value={telefono}
      />
      <TextInput
        style={styles.input}
        label="Correo"
        placeholder="ej. esteban@correo.com"
        onChangeText={(valorTexto) => setCorreo(valorTexto)}
        value={correo}
      />
      <TextInput
        style={styles.input}
        label="Empresa"
        placeholder="ej. Empresita"
        onChangeText={(valorTexto) => setEmpresa(valorTexto)}
        value={empresa}
      />

      <Button
        icon="pencil-circle"
        mode="contained"
        onPress={() => guardarCliente()}
      >
        Guardar Cliente
      </Button>

    <Portal>
        <Dialog
            visible={error ? true : false}
            onDismiss={() => setError(false)}
        >
            <Dialog.Title>
                Oops...
            </Dialog.Title>
            <Dialog.Content>
                <Paragraph>
                    Todos los campos son obligatorios
                </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={() => setError(false)}>Entendido</Button>
            </Dialog.Actions>
        </Dialog>
    </Portal>

    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: "transparent",
  },
});

export default NuevoCliente;
