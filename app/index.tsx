import React from "react";
import { Text, View, Pressable } from "react-native";
import { Icon } from "react-native-elements";
import { Link } from "expo-router";
import "../global.css";

export const options = {
  headerShown: false, // Oculta o header
};

export default function Inicial() {
  return (
    <View className="flex-1 bg-primario items-center justify-center px-5">
      <Text className="text-4xl font-bold text-black mb-64">LOGO</Text>

      <Text className="text-3xl font-bold text-black mb-2">Olá!</Text>
      <Text className="text-base text-black mb-8">Como deseja acessar?</Text>

      <Link href="/menu" asChild>
        <Pressable className="flex-row items-center border border-gray-300 rounded p-2 w-4/5 mb-4">
          <Icon name="google" type="ant-design" className="mr-2" />
          <Text className="text-base text-black text-center flex-1">
            Entrar com Google
          </Text>
        </Pressable>
      </Link>

      <Link href="/login" asChild>
        <Pressable className="border border-gray-300 rounded p-2 w-4/5">
          <Text className="text-base text-black text-center">
            Outras formas
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}
