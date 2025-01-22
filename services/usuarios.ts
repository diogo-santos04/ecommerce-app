import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const registerUser = async (nome: string, cpf: string, email: string, password: string) => {
  try {
    const response = await axios.post("http://10.42.20.89:3000/usuario/register", {
      nome,
      cpf,
      email,
      password
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error.response?.data || error.message;
  }
};

export const getUserData = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    if (token) {
      const response = await axios.get('http://10.42.20.89:3000/usuario/getUser', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data,);
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
  return null;
}

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post("http://10.42.20.89:3000/usuario/login", {
      email,
      password
    });

    console.log(response.data);

    const { token } = response.data;
    if (token) {
      await AsyncStorage.setItem('token', token);

      // Decodifica manualmente o token JWT
      const user = parseJWT(token);
      console.log('Informações do usuário:', user);

      return user; 
    } else {
      console.log('Login falhou');
      return null;
    }
  } catch (error) {
    console.error('Erro no login:', error);
    return null;
  }
};
  
export const deleteUser = async (id: number) => {
  try {
    await axios.delete(`http://10.42.20.89:3000/usuario/delete/${id}`);
    console.log(`Usuario com id ${id} deletado com sucesso`);
  } catch (error) {
    console.log(`Erro ao deletar usuario ${error}`);
  }
};

export const getUserList = async () => {
  try {
    const response = await axios.get("http://10.42.20.89:3000/usuario/dados");
    return response.data;
  } catch (error) {
    console.log(`erro ao buscar dados ${error}`);
  }
};

export const base64Decode = (base64: string) => {
  // Decodifica uma string Base64 para uma string UTF-8
  return decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
      .join('')
  );
};
//decodificar json web token
export const parseJWT = (token: string) => {
  try {
    const base64Payload = token.split('.')[1]; // Pega a parte do meio do JWT
    const payload = base64Decode(base64Payload); // Decodifica o payload
    return JSON.parse(payload); // Converte para objeto JSON
  } catch (error) {
    console.error('Erro ao decodificar JWT:', error);
    return null;
  }
};