import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Produtos } from "../types/produtos";
import { Categoria } from "../types/categoria";
import {
  getProdutos,
  adicionarProduto,
  deletarProduto,
} from "../services/produtos";
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

  const handleProductSubmit = async () => {
    try {
      const product = await adicionarProduto(nome, descricao, preco, categoriaId);
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
      const categoria = await adicionarCategoria(categoriaNome);
      fetchCategorias();
      setCategoriaNome("");
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
    }
  };

  const deletarProduto = async (id: number) => {
    await deletarProduto(id);
    fetchProducts();
  };

  const deletarCategoria = async (id: number) => {
    await deletarCategoria(id);
    fetchCategorias();
  };

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

  useEffect(() => {
    fetchProducts();
    fetchCategorias();
  }, []);

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
        onPress={() => deletarProduto(item.id)}
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
        onPress={() => deletarCategoria(item.id)}
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
      <View className="mb-8">
        <Text className="text-2xl font-bold mb-4">Adicionar Produto</Text>
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
      </View>

      <View className="mb-8">
        <Text className="text-2xl font-bold mb-4">Adicionar Categoria</Text>
        <TextInput
          className="w-full p-3 mb-4 bg-white border border-gray-300 rounded shadow-sm"
          placeholder="Nome da Categoria"
          value={categoriaNome}
          onChangeText={setCategoriaNome}
        />
        <Button title="Salvar Categoria" onPress={handleCategoriaSubmit} />
      </View>

      {loading ? (
        <Text className="mt-4 text-lg text-center">Carregando...</Text>
      ) : (
        <>
          <Text className="text-2xl font-bold mb-4">Produtos</Text>
          <FlatList
            className="w-full mb-8"
            data={produtos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderProductItem}
          />
          <Text className="text-2xl font-bold mb-4">Categorias</Text>
          <FlatList
            className="w-full"
            data={categorias}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCategoriaItem}
          />
        </>
      )}
    </ScrollView>
  );
};

export default AdminPanel;
