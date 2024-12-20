import React, { useState, useEffect } from "react";
import { Text, View, Pressable, TextInput } from "react-native";
import { Icon } from "react-native-elements";
import { useRouter } from "expo-router";
import "../global.css";
import { registerUser, } from "../services/usuarios";

export default function Login() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const user = await registerUser(nome, cpf, email, password);
      console.log(user);
      router.push("/menu");
    } catch (error:any) {
        const errorMessage = error.response?.data?.error || "Erro ao registrar.";
        setError(errorMessage);
    }
  };

  return (
    <View className="flex-1 bg-[#ECEBDE] justify-center px-6">
      <Text className="text-3xl text-black font-semibold text-center">
        Crie sua conta
      </Text>

      <Text className="text-xl text-black text-center mt-2">
        Informe os dados abaixo para registrar
      </Text>

      <TextInput
        className="w-full p-4 mt-6 bg-white border border-gray-300 rounded-md"
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        className="w-full p-4 mt-6 bg-white border border-gray-300 rounded-md"
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
      />

      <TextInput
        className="w-full p-4 mt-6 bg-white border border-gray-300 rounded-md"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        className="w-full p-4 mt-4 bg-white border border-gray-300 rounded-md"
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error && <Text className="text-red-500 text-center mt-4">{error}</Text>}

      <Pressable
        className="bg-primario p-4 rounded-md mt-6"
        onPress={handleSubmit}
      >
        <Text className="text-white text-center text-lg font-semibold">
          Registrar
        </Text>
      </Pressable>
    </View>
  );
}
