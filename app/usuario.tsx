import React, { useState, useEffect } from "react";
import {View,TextInput,Button,Text,FlatList,TouchableOpacity,} from "react-native";
import axios from "axios";

// Definindo uma interface para o tipo do usuário
interface Usuario {
  id: number;
  nome: string;
  cpf: string;
}

const usuario = () => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  //funcao q manda salvar
  const handleSubmit = async () => {
    try {
      const cpfAsNumber = Number(cpf);
      if (isNaN(cpfAsNumber)) {
        throw new Error("O CPF deve ser um número válido");
      }
      await salvarUsuario(nome, cpfAsNumber);
      setNome("");
      setCpf("");
      fetchUsuarios();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    }
  };

  //funcao de salvar usuario
  const salvarUsuario = async (nome: string, cpf: number) => {
    try {
      const resposta = await axios.post("http://localhost:3000/api/usuario", {
        nome,
        cpf,
      });

      console.log("Usuário salvo com sucesso:", resposta.data);
    } catch (error: any) {
      console.error(
        "Erro ao salvar usuário:",
        error.response?.data || error.message
      );
    }
  };

  const deletarUsuario = async (id: number) => {
    try {
      // Fazendo a requisição DELETE para a API
      await axios.delete(`http://localhost:3000/api/usuario/${id}`);

      // Atualizando a lista de usuários após a exclusão
      fetchUsuarios();
      console.log(`Usuário com id ${id} deletado com sucesso.`);
    } catch (error: any) {
      // Tratando erros e exibindo mensagens apropriadas
      console.error(
        "Erro ao deletar usuário:",
        error.response?.data || error.message
      );
    }
  };

  //funcao p renderizar os usuarios
  const fetchUsuarios = async () => {
    try {
      const resposta = await axios.get("http://localhost:3000/dados");
      setUsuarios(resposta.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

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
