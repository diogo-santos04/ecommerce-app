import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Header } from "../components/header";

const Carrinho = () => {
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Produto 1', price: 10.00, quantity: 1 },
    { id: '2', name: 'Produto 2', price: 20.00, quantity: 2 },
  ]);

  const handleIncrement = (itemId: any) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (itemId: any) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <View className="flex-1 bg-secundario">
        <Header />
      <Text className="text-lg font-bold mb-4">Carrinho de Compras</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg">{item.name}</Text>
            <View className="flex-row items-center">
              <TouchableOpacity onPress={() => handleDecrement(item.id)} className="p-2 bg-gray-200 rounded">
                <Text className="text-lg">-</Text>
              </TouchableOpacity>
              <Text className="mx-2">{item.quantity}</Text>
              <TouchableOpacity onPress={() => handleIncrement(item.id)} className="p-2 bg-gray-200 rounded">
                <Text className="text-lg">+</Text>
              </TouchableOpacity>
            </View>
            <Text className="text-lg">${(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        )}
      />
      <View className="border-t pt-4">
        <Text className="text-lg font-bold">Total: ${getTotal()}</Text>
      </View>
    </View>
  );
};

export default Carrinho;
