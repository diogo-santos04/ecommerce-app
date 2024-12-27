import axios from "axios";
import { Categoria } from "../types/categoria";

export const getCategorias = async (): Promise<Categoria[]> => {
  try {
    const response = await axios.get("http://10.42.20.89:3000/categoria/");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    throw error;
  }
};

export const adicionarCategoria = async (nome: string): Promise<Categoria> => {
  try {
    const response = await axios.post("http://10.42.20.89:3000/categoria/add", { nome });
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar categoria:", error);
    throw error;
  }
};

export const deletarCategoria = async (id: number): Promise<void> => {
  try {
    await axios.delete(`http://10.42.20.89:3000/categoria/delete/${id}`);
  } catch (error) {
    console.error("Erro ao deletar categoria:", error);
    throw error;
  }
};
