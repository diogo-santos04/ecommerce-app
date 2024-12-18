import React from "react";
import { Text, View, Pressable, TextInput } from "react-native";
import { Icon } from "react-native-elements";
import { Link } from "expo-router";
import "../global.css";
import { ButtonAction } from "../components/button-action";

export default function Login() {
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
        keyboardType="email-address"
      />

      <TextInput
        className="w-full p-4 mt-4 bg-white border border-gray-300 rounded-md"
        placeholder="Senha"
        secureTextEntry
      />

      <Pressable className="text-lg text-blue-500 mt-4">
        <Text>Esqueci minha senha</Text>
      </Pressable>

      <Pressable className="bg-primario p-4 rounded-md mt-6">
        <Text className="text-white text-center text-lg font-semibold">
          Acessar
        </Text>
      </Pressable>

      <View className="flex-row justify-center mt-4">
        <Text className="text-lg text-black">Ainda não tem uma conta? </Text>
        <Pressable>
          <Text className="text-lg text-blue-500">Cadastrar</Text>
        </Pressable>
      </View>
    </View>
  );
}
