import { useState } from "react";
import { StyleSheet, Text, View, StatusBar, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function App() {
  const regiaoInicial = {
    latitude: -23.533773,
    longitude: -46.65529,
    // latitudeDelta: 0.0922,
    // longitudeDelta: 0.0421
    latitudeDelta: 10,
    longitudeDelta: 10,
  };

  const [localizacao, setLocalizacao] = useState({
    latitude: 26.357896,
    longitude: 127.783809,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  const marcarLocal = (event) => {
    setLocalizacao({
      ...localizacao,
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
    console.log(localizacao);
  };

  return (
    <>
      <StatusBar />
      <View style={estilos.container}>
        <MapView
          onPress={marcarLocal}
          style={estilos.mapa}
          initialRegion={regiaoInicial}
          liteMode={false} // somente android
          mapType="hybrid"
          userInterfaceStyle="light" // somente ios
          maxZoomLevel={20}
          minZoomLevel={2}
        >
          <Marker
            draggable
            coordinate={localizacao}
            title="oie"
            onPress={(e) => console.log(e.nativeEvent)}
          >
            <Image source={require("./assets/ghost.png")} />
          </Marker>
        </MapView>
      </View>
    </>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapa: {
    width: "100%",
    height: "100%",
  },
});
