import { Pressable, Text, View } from "react-native";
import Icon from '@expo/vector-icons/FontAwesome6';
import { ReactNode } from "react";

type Props = {
    title: string;
    onPress: () => void;
    children: ReactNode;
}

export const ButtonCard = ({ title, onPress, children }: Props) => {
    return (
        <Pressable onPress={onPress} className="px-6 py-4">
            <View className="flex-row justify-between items-center">
                <Text className="text-2xl font-semibold">{title}</Text>
                <View className="mr-1">
                    <Icon name="chevron-right" size={16} color="black" />
                </View>
            </View>
            {children}
        </Pressable>
    );
}