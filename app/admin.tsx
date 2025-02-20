import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { Produtos } from "../types/produtos";
import { Categoria } from "../types/categoria";
import {
  getProdutos,
  adicionarProduto,
  deletarProduto,
} from "../services/produtos";
import Card from "../components/cardModal";
import {
  getCategorias,
  adicionarCategoria,
  deletarCategoria,
} from "../services/categorias";
import Dropdown from "react-native-input-select";

const AdminPanel = () => {
  const [loading, setLoading] = useState(true);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [produtos, setProdutos] = useState<Produtos[]>([]);

  const [categoriaNome, setCategoriaNome] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaId, setCategoriaId] = useState<number | undefined>(undefined);

  useEffect(() => {
    fetchProducts();
    fetchCategorias();
  }, []);

  const fetchProducts = async () => {
    const productList = await getProdutos();
    setProdutos(productList);
    setLoading(false);
  };

  const fetchCategorias = async () => {
    const categoriaList = await getCategorias();
    setCategorias(categoriaList);
    setLoading(false);
  };

  const handleProductSubmit = async () => {
    try {
      await adicionarProduto(nome, descricao, preco, categoriaId);
      fetchProducts();
      setNome("");
      setDescricao("");
      setPreco("");
      setCategoriaId(undefined);
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  const handleCategoriaSubmit = async () => {
    try {
      await adicionarCategoria(categoriaNome);
      fetchCategorias();
      setCategoriaNome("");
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
    }
  };

  const handleDeletarProduto = useCallback(
    async (id: number) => {
      try {
        await deletarProduto(id);
        fetchProducts();
      } catch (error) {
        console.error("Erro ao deletar produtos:", error);
      }
    },
    [deletarProduto]
  );

  const handleDeletarCategoria = useCallback(
    async (id: number) => {
      try {
        await deletarCategoria(id);
        fetchCategorias();
      } catch (error) {
        console.error("Erro ao deletar categoria:", error);
      }
    },
    [deletarCategoria]
  );

  const renderProductItem = ({ item }: { item: Produtos }) => (
    <View className="bg-white p-4 mb-2 rounded-lg border border-gray-200 flex-row justify-between items-center shadow-md">
      <View className="flex-1">
        <Text className="text-lg font-semibold">Nome: {item.nome}</Text>
        <Text className="text-lg">Descrição: {item.descricao}</Text>
        <Text className="text-lg">Preço: R${item.preco}</Text>
        <Text className="text-lg">Categoria: {item.categoria}</Text>
      </View>
      <TouchableOpacity
        className="bg-red-500 p-2 rounded ml-4"
        onPress={() => handleDeletarProduto(item.id)}
      >
        <Text className="text-white text-xs">Deletar</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCategoriaItem = ({ item }: { item: Categoria }) => (
    <View className="bg-white p-4 mb-2 rounded-lg border border-gray-200 flex-row justify-between items-center shadow-md">
      <View className="flex-1">
        <Text className="text-lg font-semibold">Nome: {item.nome}</Text>
      </View>
      <TouchableOpacity
        className="bg-red-500 p-2 rounded ml-4"
        onPress={() => handleDeletarCategoria(item.id)}
      >
        <Text className="text-white text-xs">Deletar</Text>
      </TouchableOpacity>
    </View>
  );

  const categoriaOptions = categorias.map((categoria) => ({
    label: categoria.nome,
    value: categoria.id,
  }));

  return (
    <ScrollView className="flex-1 p-4 bg-gray-200">
      <Text className="text-3xl font-bold mb-8 text-center">Admin</Text>

      <Card title="Adicionar Produto">
        <View className="flex-1 p-4">
          <TextInput
            className="w-full p-3 mb-4 bg-white border border-gray-300 rounded shadow-sm"
            placeholder="Nome do Produto"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            className="w-full p-3 mb-4 bg-white border border-gray-300 rounded shadow-sm"
            placeholder="Descrição do Produto"
            value={descricao}
            onChangeText={setDescricao}
          />
          <TextInput
            className="w-full p-3 mb-4 bg-white border border-gray-300 rounded shadow-sm"
            placeholder="Preço do Produto"
            value={preco}
            onChangeText={setPreco}
            keyboardType="numeric"
          />
          <Dropdown
            label="Categoria"
            placeholder="Selecione uma categoria..."
            options={categoriaOptions}
            selectedValue={categoriaId}
            onValueChange={(value) => setCategoriaId(Number(value))}
            primaryColor="green"
          />
          <Button title="Salvar Produto" onPress={handleProductSubmit} />
          <FlatList
            className="w-full mt-4"
            data={produtos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderProductItem}
          />
        </View>
      </Card>

      <Card title="Adicionar Categoria">
        <View className="flex-1 p-4">
          <TextInput
            className="w-full p-3 mb-4 bg-white border border-gray-300 rounded shadow-sm"
            placeholder="Nome da Categoria"
            value={categoriaNome}
            onChangeText={setCategoriaNome}
          />
          <Button title="Salvar Categoria" onPress={handleCategoriaSubmit} />
          <FlatList
            className="w-full mt-4"
            data={categorias}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCategoriaItem}
          />
        </View>
      </Card>
    </ScrollView>
  );
};

export default AdminPanel;
