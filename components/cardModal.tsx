import React, { ReactNode, useState } from "react";
import { View, Text, Pressable, Modal } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  title: string;
  children?: ReactNode;
};

const Card = ({ title, children }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="w-full">
      <Pressable
        className="bg-white rounded-lg shadow-lg p-6 mb-4 flex-row items-center"
        onPress={() => setModalVisible(true)}
      >
        <FontAwesome
          name="plus-circle"
          size={24}
          color="#4CAF50"
          className="mr-4"
        />
        <Text className="text-xl font-semibold text-gray-800 flex-1">
          {title}
        </Text>
      </Pressable>

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-gray-100">
          <View className="bg-white rounded-lg p-6 w-full h-full">
            <Text className="text-lg font-semibold mb-4">{title}</Text>
            <View className="flex-1">{children}</View>
            <Pressable
              className="bg-red-500 p-3 rounded-lg mt-4"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white text-center">Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Card;
