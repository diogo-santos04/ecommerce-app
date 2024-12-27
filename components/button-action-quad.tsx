import { Pressable, Text, View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome6";

type Props = {
  icon: string;
  label: string;
  onPress: () => void;
  badge?: string;
  backgroundColor?: string; // Cor do botão
  badgeColor?: string; // Cor do badge
  textColor?: string; // Cor do texto
  iconColor?: string; // Cor do ícone
};

export const ButtonActionQuad = ({
  icon,
  label,
  onPress,
  badge,
  backgroundColor = "#FF9C73", // Cor padrão
  badgeColor = "red", // Cor padrão do badge
  textColor = "black", // Cor padrão do texto
  iconColor = "black", // Cor padrão do ícone
}: Props) => {
  return (
    <Pressable onPress={onPress} className="w-1/3 px-4 py-2">
      <View className="w-24 h-20 justify-center items-center" style={{ backgroundColor, borderRadius: 8 }}>
        <Icon name={icon} size={24} color={iconColor} />
      </View>
      <Text className="font-semibold" style={{ color: textColor }}>
        {label}
      </Text>
    </Pressable>
  );
};
