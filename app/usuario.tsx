import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Usuario } from "../types/usuario";
import { getUserList, registerUser, deleteUser } from "../services/usuarios";

const usuario = () => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  const handleSubmit = async () => {
    try {
      const user = await registerUser(nome, cpf, email, password);
      fetchUsuarios() // Update state with the returned user
      setNome("");
      setCpf("");
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    }
  };

  const deletarUsuario = async (id: number) => {
    await deleteUser(id);
    fetchUsuarios(); // Fetch updated list after deletion
  };

  const fetchUsuarios = async () => {
    const userList = await getUserList();
    setUsuarios(userList);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []); // Empty dependency array to fetch users only once

  const renderItem = ({ item }: { item: Usuario }) => (
    <View className="bg-white p-4 mb-2 rounded-lg border border-gray-200 flex-row justify-between items-center">
      <View className="flex-1">
        <Text className="text-lg">Nome: {item.nome}</Text>
        <Text className="text-lg">CPF: {item.cpf}</Text>
      </View>
      <TouchableOpacity
        className="bg-red-500 p-1 rounded ml-4"
        onPress={() => deletarUsuario(item.id)}
      >
        <Text className="text-white text-xs">Deletar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 justify-center items-center p-4">
      <TextInput
        className="w-full p-3 mb-4 bg-white border border-gray-300 rounded"
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        className="w-full p-3 mb-4 bg-white border border-gray-300 rounded"
        placeholder="Cpf"
        value={cpf}
        onChangeText={setCpf}
      />
      <Button title="Salvar" onPress={handleSubmit} />

      {loading ? (
        <Text className="mt-4 text-lg">Carregando...</Text>
      ) : (
        <FlatList
          className="w-full mt-4"
          data={usuarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default usuario;