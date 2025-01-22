import React, { useState, useEffect } from "react";
import { Text, View, Pressable, TextInput, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { Link, useRouter } from "expo-router";
import "../global.css";
import { ButtonAction } from "../components/button-action";
import { login } from "../services/usuarios";
import { Touchable } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const user = await login(email, password);
      if (user) {
        router.push("/menu");
      } else {
        const errorMessage =
          user.error || "Email ou senha inválido";
        setError(errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1 bg-[#ECEBDE] justify-center px-6">
      <Text className="text-3xl text-black font-semibold text-center">
        Acesse
      </Text>

      <Text className="text-xl text-black text-center mt-2">
        Com o email ou senha para acessar
      </Text>

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
      <Pressable className="text-lg text-blue-500 mt-4">
        <Text>Esqueci minha senha</Text>
      </Pressable>

      <TouchableOpacity className="bg-primario p-4 rounded-md mt-6" onPress={handleSubmit}>
        <Text className="text-white text-center text-lg font-semibold">
          Acessar
        </Text>
      </TouchableOpacity>

      <View className="flex-row justify-center mt-4">
        <Text className="text-lg text-black">Ainda não tem uma conta? </Text>
        <Link href="/register">
          <Pressable>
            <Text className="text-lg text-blue-500">Cadastrar</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
