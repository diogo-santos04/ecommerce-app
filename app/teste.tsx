import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Movie } from "../types/movie";
import { Usuario } from "../types/usuario";
import { getMovieList } from "../services/movies";
import usuario from "./admin";

export default function Teste() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  //Exemplo fetch com api, armazena dados em algum lugar
  const getMovies = async () => {
    const movieList = await getMovieList();
    setMovies(movieList);
  };

  const getUsuarios = async () => {
    const response = await fetch("http://10.42.20.89:3000/usuario/dados");
    try {
      const json = await response.json();
      console.log(json);
      setUsuarios(json);
    } catch (error) {
      console.error(error);
    }
  };

  //funcao que roda quando pagina é renderizada (?)
  useEffect(() => {
    getUsuarios();
  }, []);

  return (
    <View className=" justify-center items-center">
      <Text className="text-1xl m-2">
        Usuarios: {usuarios.length}
      </Text>

      {usuarios.map((usuario) => (
        <View key={usuario.id} className="justify-center items-center">
          <Text className="text-1xl m-2">Nome: {usuario.nome}</Text>
          <Text className="text-1xl m-2">CPF: {usuario.cpf}</Text>
          <Text className="text-1xl m-2">Email: {usuario.email}</Text>
        </View>
      ))}
    </View>
  );
}
