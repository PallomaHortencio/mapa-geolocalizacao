import { useState } from "react";
import { StyleSheet, Text, View, StatusBar, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function App() {
  const regiaoInicial = {
    latitude: 42.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [localizacao, setLocalizacao] = useState({
    latitude: 26.357896,
    longitude: 127.783809,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  return (
    <>
      <StatusBar />
      <View style={estilos.container}>
        <MapView
          onPress={""}
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
            onPress={(event) => {
              console.log(event.nativeEvent);
            }}
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
