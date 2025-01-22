import { Button, Pressable, ScrollView, Text, View, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { Header } from "../components/header";
import { ButtonCard } from "../components/button-card";
import { ButtonAction } from "../components/button-action";
import { ButtonActionQuad } from "../components/button-action-quad";
import Icon from "@expo/vector-icons/FontAwesome6";
import { StatusBar } from "expo-status-bar";
import { Produtos } from "../types/produtos";
import { Categoria } from "../types/categoria";
import { getProdutos } from "../services/produtos";
import { getCategorias } from "../services/categorias";
import { getUserData } from "../services/usuarios";
import { Usuario } from "../types/usuario";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ButtonIcon } from "../components/button-icon";
import CardProduto from "../components/cardProduto";
// import { Image } from "expo-image";

export default function Screen() {
  const [produtos, setProdutos] = useState<Produtos[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [user, setUser] = useState<Usuario | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    setModalVisible(false);
    router.push("/login");
  };

  const fetchProducts = async () => {
    const productList = await getProdutos();
    setProdutos(productList);
  };

  const fetchCategorias = async () => {
    const categoriaList = await getCategorias();
    setCategorias(categoriaList);
  };

  const fetchUserData = async () => {
    const userData = await getUserData();
    setUser(userData);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategorias();
    fetchUserData();
  }, []);

  return (
    <ScrollView className="h-screen bg-secundario">
      <StatusBar style="light" />

      <View className="flex-row justify-between items-center px-4 py-1 bg-primario text-white border-e-black-50">
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
            <Icon
              name="user"
              size={18}
              color="white"
              onPress={() => setModalVisible(true)}
            />
          </Pressable>
        </View>
      </View>
      <Modal
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        transparent={true}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-6 rounded-lg shadow-lg w-80">
            {user && (
              <View className="mb-4">
                <Text className="text-lg font-semibold">Nome: {user.nome}</Text>
                <Text className="text-lg font-semibold">CPF: {user.cpf}</Text>
                <Text className="text-lg font-semibold">
                  Email: {user.email}
                </Text>
              </View>
            )}
            <View className="mb-4">
              <Pressable onPress={handleLogout}>
                <Text className="text-blue-500 text-center">Logout</Text>
              </Pressable>
            </View>
            <Pressable
              className="bg-red-500 p-3 rounded-lg"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white text-center">Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <ButtonCard title="Produtos" onPress={() => {}}>
        <Text></Text>
      </ButtonCard>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-3"
      >
        <ButtonAction icon="box" label="Produto 1" onPress={() => {}} />
        <ButtonAction icon="box" label="Produto 2" onPress={() => {}} />
        <ButtonAction icon="box" label="Produto 3" onPress={() => {}} />
        <ButtonAction icon="box" label="Produto 4" onPress={() => {}} />
      </ScrollView>

      <View className="h-1 bg-gray-100 mt-8"></View>

      <Text className="text-2xl font-semibold px-6 py-4">Lançamentos</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-1"
      >
        <View className="px-4 py-6">
          <View className="flex-row space-x-5">
            {produtos.map((produtos) => (
              <CardProduto
                key={produtos.id}
                label={produtos.nome}
                imagem={produtos.imagem}
                title={produtos.nome}
                descricao={produtos.descricao}
                preco={produtos.preco}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <View className="h-1 bg-gray-100 mt-8"></View>

      <View>
        <Text className="text-2xl font-semibold px-6 py-4">Categorias</Text>
        <View className="flex-row flex-wrap px-2">
          <ButtonActionQuad
            icon="bath"
            label="Sais de Banho"
            onPress={() => {}}
          />
          <ButtonActionQuad
            icon="prescription-bottle-medical"
            label="Medicinal"
            onPress={() => {}}
          />
          <ButtonActionQuad
            icon="bag-shopping"
            label="Kits"
            onPress={() => {}}
          />
          <ButtonActionQuad
            icon="bottle-droplet"
            label="Tratamentos"
            onPress={() => {}}
          />
        </View>
      </View>
    </ScrollView>
  );
}
