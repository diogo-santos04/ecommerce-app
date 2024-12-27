import { Produtos } from "../types/produtos";
import axios from "axios";

export const getProdutos = async () => {
  try {
    const response = await axios.get("http://10.42.20.89:3000/produtos");
    return response.data;
  } catch (error) {
    console.log(`erro ao buscar dados ${error}`);
  }
};

export const deletarProduto = async () => {};

export const adicionarProduto = async (nome: string, descricao: string, preco: string, categoriaId: number | undefined) => {
  try {
    const response = await axios.post("http://10.42.20.89:3000/produtos/add", {
      nome,
      descricao,
      preco: parseFloat(preco),
      categoria_id: categoriaId,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar produto:", error);
    throw error;
  }
};