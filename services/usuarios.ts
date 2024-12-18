import axios from "axios";

export const createUser = async (nome: string, cpf: string) => {
  try {
    const response = await axios.post("http://localhost:3000/usuario/create", {
      nome,
      cpf,
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const deleteUser = async (id: number) => {
  try {
    await axios.delete(`http://localhost:3000/usuario/delete/${id}`);
    console.log(`Usuario com id ${id} deletado com sucesso`);
  } catch (error) {
    console.log(`Erro ao deletar usuario ${error}`);
  }
};

export const getUserList = async () => {
  try {
    const response = await axios.get("http://localhost:3000/usuario/dados");
    return response.data;
  } catch (error) {
    console.log(`erro ao buscar dados ${error}`);
  }
};
