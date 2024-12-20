import axios from "axios";

export const registerUser = async (nome: string, cpf: string, email: string, password: string) => {
  try {
    const response = await axios.post("http://localhost:3000/usuario/register", {
      nome,
      cpf,
      email,
      password
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post("http://localhost:3000/usuario/login",{
      email,
      password
    })
    return response.data;
  } catch (error) { 
      console.log(error);
  }
}

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
