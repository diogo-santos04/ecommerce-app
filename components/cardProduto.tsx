import React from 'react';
import { View, Text, Image, Pressable, ViewStyle } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type Props = {
    title: string;
    label: string;
    descricao: string;
    preco: number;
    imagem: any;
    style?: ViewStyle; // Add style prop
}

const CardProduto = ({ title, imagem, label, descricao, preco, style }: Props) => {
  return (
    <View className="bg-white rounded-lg shadow-md p-4" style={[{ minWidth: 200, maxWidth: 300 }, style]}>
      <Image
        source={{ uri: imagem }}
        className="h-36 w-full rounded-md"
        alt="Produto"
      />
      <View className="mt-4">
        <Text className="text-lg font-semibold">{title}</Text>
        <View className="flex-row items-center mt-1">
          {[...Array(5)].map((_, index) => (
            <FontAwesome
              key={index}
              name="star"
              size={16}
              color="#FFD700"
              className="mr-1"
            />
          ))}
        </View>
        <Text className="text-gray-500 mt-2">
          {descricao}
        </Text>
        <View className="flex-row justify-between items-center mt-4">
          <Text className="text-xl font-bold">R$ {preco}</Text>
          <Pressable className="bg-orange-500 p-2 rounded-full">
            <FontAwesome name="shopping-cart" size={20} color="white" />
          </Pressable>
        </View>
      </View>
      <View className="absolute top-2 right-2 flex-row space-x-2">
        <Pressable className="p-1 bg-gray-100 rounded-full">
          <FontAwesome name="share-alt" size={16} color="#555" />
        </Pressable>
        <Pressable className="p-1 bg-gray-100 rounded-full">
          <FontAwesome name="heart" size={16} color="#555" />
        </Pressable>
      </View>
    </View>
  );
};

export default CardProduto;
