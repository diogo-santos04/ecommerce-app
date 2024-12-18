import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import {Movie} from "../types/movie"
import { Usuario } from "../types/usuario"
import { getMovieList } from "../services/movies";

export default function Teste(){
    const [movies, setMovies] = useState<Movie[]>([]);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    //Exemplo fetch com api, armazena dados em algum lugar 
    const getMovies = async () => {
       const movieList = await getMovieList();
       setMovies(movieList);
    }

    const getUsuarios = async () => {
        const response = await fetch ("http://localhost:3000/usuario/dados")
        try {
            const json = await response.json();
            console.log(json);
            setUsuarios(json);
        } catch (error) {
            console.error(error)
        }
    }

    //funcao que roda quando pagina é renderizada (?)
    useEffect(() =>{
        getMovies();
        getUsuarios();
    }, [])

    return(
        <View className=" justify-center items-center"> 
            <Text className="text-1xl m-2">Quantidade de Filmes: {movies.length}</Text>
            <Text className="text-1xl m-2">Quantidade de usuarios: {usuarios.length}</Text>

            {movies.map(movie => (
                <View key={movie.id} className="justify-center items-center">
                    <Text className="text-1xl m-2">Titulo do filme: {movie.title}</Text>
                    <Text className="text-1xl m-2">Ano de lançament: {movie.releaseYear}</Text>
                </View>    
            ))}
        </View>
    );
}