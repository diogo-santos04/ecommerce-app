import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Icon } from "react-native-elements";
import "./global.css"

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>LOGO</Text>

      <Text style={styles.welcomeText}>Olá!</Text>
      <Text style={styles.subText}>Como deseja acessar?</Text>

      <Pressable style={styles.googleButton}>
        <Icon name="google" type="ant-design" style={styles.icon} />
        <Text style={styles.googleButtonText}>Entrar com Google</Text>
      </Pressable>

      <Pressable style={styles.otherButton}>
        <Text style={styles.otherButtonText}>Outras formas</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FA812F",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: "#000",
    marginBottom: 30,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "80%",
    marginBottom: 15,
    justifyContent: "flex-start", // Alinha o ícone à esquerda
  },
  icon: {
    marginRight: 10, // Espaço entre o ícone e o texto
  },
  googleButtonText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    flex: 1, // O texto ocupa o restante do espaço e fica centralizado
  },
  otherButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "80%",
  },
  otherButtonText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
});
