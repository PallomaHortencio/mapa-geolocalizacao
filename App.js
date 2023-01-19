import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Alert,
  Button,
  SafeAreaView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function App() {
  /* State para a geolocalização */
  const [minhaLocalizacao, setMinhaLocalizacao] = useState(null);

  useEffect(() => {
    async function obterLocalizacao() {
      // Acessando o status da requisição de permissão de uso
      const { status } = await Location.requestForegroundPermissionsAsync();

      // Verificando o status
      /* if (status !== "granted") {
        Alert.alert(
          "Ops!",
          "Você não autorizou o uso de recursos de localização"
        );
        return;
      } */

      // Acessando os dados de geolocalização
      let localizacaoAtual = await Location.getCurrentPositionAsync({});

      // Adicionando os dados ao state
      setMinhaLocalizacao(localizacaoAtual.coords);
    }

    obterLocalizacao();
  }, []);

  console.log(minhaLocalizacao);

  const regiaoInicial = {
    // Estado de SP
    latitude: -23.533773,
    longitude: -46.65529,
    latitudeDelta: 10,
    longitudeDelta: 10,
  };

  /* Usando state para controlar a localização */
  const [localizacao, setLocalizacao] = useState();

  const marcarLocal = () => {
    console.log(minhaLocalizacao);
    setLocalizacao({
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      ...minhaLocalizacao,
    });
    //console.log(localizacao);
  };

  return (
    <>
      <StatusBar />
      <SafeAreaView style={estilos.container}>
        <View style={estilos.viewBotao}>
          <Button title="Onde estou?" onPress={marcarLocal} />
        </View>
        <View style={estilos.viewMapa}>
          <MapView
            style={estilos.mapa}
            region={localizacao ?? regiaoInicial}
            liteMode={false}
            mapType="hybrid"
          >
            {localizacao && (
              <Marker
                coordinate={localizacao}
                title="Aqui!!!"
                onPress={(e) => console.log(e.nativeEvent)}
              />
            )}
          </MapView>
        </View>
      </SafeAreaView>
    </>
  );
}

const estilos = StyleSheet.create({
  mapa: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
  },
  viewMapa: {
    flex: 1,
  },
  viewBotao: {},
});
