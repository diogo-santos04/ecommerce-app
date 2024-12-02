import { SafeAreaView, Text, View } from "react-native";
import { ProfileIcon } from "./profile-icon";
import { ButtonIcon } from "./button-icon";

export const Header = () => {
  return (
    <SafeAreaView className="bg-primario text-white border-e-black-50">
      <View className="flex-row justify-between px-4">
        <Text className="text-3xl font-bold p-2">LOGO</Text>
        <View className="flex-row">
          <ButtonIcon icon="magnifying-glass" onPress={() => {}} />
          <ButtonIcon icon="bell" onPress={() => {}} />
          <ButtonIcon icon="cart-shopping" onPress={() => {}} />
          <ProfileIcon />
        </View>
      </View>
    </SafeAreaView>
  );
};
