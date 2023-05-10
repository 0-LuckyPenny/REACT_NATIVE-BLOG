import { View, StyleSheet, Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { colors } from '../../helpers/colors'

export default function MapScreen({ route }) {
  const { latitude, longitude } = route.params.coords
  const location = route.params.location
  const title = route.params.title

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
        mapType='standard'
        minZoomLevel={15}
        onMapReady={() => console.log('Map is ready')}
        onRegionChange={() => console.log('Region change')}
      >
        <Marker
          coordinate={{ latitude, longitude }}
          title={location}
          description={title}
        />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})
