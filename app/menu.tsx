import {
  Button,ScrollView,StyleSheet,Text,TextInput,View,Image,
} from "react-native";
import { Header } from "../components/header";
import { ButtonCard } from "../components/button-card";
import { ButtonAction } from "../components/button-action";
import { ButtonActionQuad } from "../components/button-action-quad";
import { ButtonGeneral } from "../components/button-general";
import Icon from "@expo/vector-icons/FontAwesome6";
import { StatusBar } from "expo-status-bar";
import Card from "../components/card";
// import { Image } from "expo-image";

export default function Screen() {
  return (
    <ScrollView className="h-screen bg-secundario">
      <StatusBar style="light" />

      <Header />

      <ButtonCard title="Produtos" onPress={() => {}}>
        <Text ></Text>
      </ButtonCard>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-3" >
        <ButtonAction icon="box" label="Produto 1" onPress={() => {}} />
        <ButtonAction icon="box" label="Produto 2" onPress={() => {}} />
        <ButtonAction icon="box" label="Produto 3" onPress={() => {}} />
        <ButtonAction icon="box" label="Produto 4" onPress={() => {}} />
      </ScrollView>

      <View className="h-1 bg-gray-100 mt-8"></View>
        
      <Text className="text-2xl font-semibold px-6 py-4">Lançamentos</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-1">
            <View className="px-4 py-6">
                <View className="flex-row space-x-5">      
                    <Card label="" imagem="" title="Kit Exemplo" descricao="Descricao produto" preco={25}/>
                    <Card label="" imagem="" title="Kit Exemplo 2" descricao="descricao produto 2" preco={12}/>
                </View>
            </View>
        </ScrollView>
     

      <View className="h-1 bg-gray-100 mt-8"></View>

      <View>
        <Text className="text-2xl font-semibold px-6 py-4">Categorias</Text>
        <View className="flex-row flex-wrap px-2">
          <ButtonActionQuad icon="bath" label="Sais de Banho" onPress={() => {}}/>
          <ButtonActionQuad icon="prescription-bottle-medical" label="Medicinal" onPress={() => {}}/>
          <ButtonActionQuad icon="bag-shopping" label="Kits" onPress={() => {}}/>
          <ButtonActionQuad icon="bottle-droplet" label="Tratamentos" onPress={() => {}}/>
        </View>
      </View>
    </ScrollView>
  );
}
