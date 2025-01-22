import { Pressable, SafeAreaView, Text, View } from "react-native";
import { ButtonIcon } from "./button-icon";
import { Link } from "expo-router";
import Icon from "@expo/vector-icons/FontAwesome6";

export const Header = () => {
  return (
    <SafeAreaView className="bg-primario text-white border-e-black-50">
      <View className="flex-row justify-between items-center px-4 py-1">
        <Link href="/menu">
          <Text className="text-3xl font-bold p-1">LOGO</Text>
        </Link>
        <View className="flex-row items-center space-x-3">
          <ButtonIcon icon="magnifying-glass" onPress={() => {}} />
          <ButtonIcon icon="bell" onPress={() => {}} />
          <Link href="/carrinho">
            <Pressable>
              <ButtonIcon icon="cart-shopping" onPress={() => {}} />
            </Pressable>
          </Link>
          <Pressable
            onPress={() => {}}
            className="w-12 h-12 bg-white/40 justify-center items-center rounded-full"
          >
            <Icon name="user" size={18} color="white" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};
