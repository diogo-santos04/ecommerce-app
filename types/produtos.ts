export type Produtos = {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    categoria: string;
    estoque?: number; 
    imagem?: string; 
    categoria_id?: number; 
  };
  