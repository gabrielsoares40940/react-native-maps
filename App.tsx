import { View,Text } from 'react-native';
import { styles } from './styles';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, watchPositionAsync, LocationAccuracy} from 'expo-location';
import { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps'


export default function App() {
  const [location, setLocation] = useState < LocationObject | null>(null);

  async function requestLocationPermissions() {
    const {granted} = await requestForegroundPermissionsAsync();

    if (granted){
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
    }
  }

    useEffect(() =>{
      requestLocationPermissions();
    }, []);
    
    useEffect(() => {
      watchPositionAsync({
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1
      }, (response) => {
        console.log("NOVA LOCALIZAÇÃO!", response);
        setLocation(response);
      });
    }, []);

  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text style={styles.text}>
          TransporChat
        </Text>
      </View>
      {
        location&&

        <MapView style={styles.map}
        initialRegion ={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            }}
            />
          </MapView>
      }
    </View>
  );
}
