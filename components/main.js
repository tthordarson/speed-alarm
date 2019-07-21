//@flow
import React from 'react';
import { StyleSheet, Text, View, Vibration } from 'react-native';
import { getDistance } from 'geolib';
import convert from 'convert-units';
import { logCoordinate } from '../utilities/logger';
import { activateKeepAwake } from 'expo-keep-awake';
import * as Location from 'expo-location';

type AppState = {
  locationA?: Coordinates,
  locationB?: Coordinates 
}

const INTERVAL_SECONDS = 3;

class App extends React.Component<{}, AppState> {
  state: AppState = {

  }
  
  componentDidMount() {
    Location.watchPositionAsync({
      timeInterval: INTERVAL_SECONDS * 1000,
      accuracy: Location.Accuracy.BestForNavigation
    }, ({coords, timestamp}) => {
      const { locationA } = this.state;

      this.setState({
        locationA: coords,
        locationB: locationA
      }, () => {
        logCoordinate(coords, this.speedKmPerHour);
      });
    })
    activateKeepAwake();
  }

  componentDidUpdate() {
    const speed = this.speedKmPerHour;

    if (speed > 50 && speed <= 60) {
      Vibration.vibrate([3000, 1000, 3000]);
    }
    else if (speed > 60) {
      Vibration.vibrate(10000);
    }
  }

  get distance() {
    const { locationA, locationB } = this.state;

    if (!locationA || !locationB) {
      return null;
    }

    return getDistance(locationA, locationB);
  }

  get speedMetersPerSecond() {
    if (!this.distance) {
      return 0;
    }

    return this.distance / INTERVAL_SECONDS;
  }

  get speedKmPerHour() {
    //const speedPerMs = this.speedMetersPerSecond;
    const speedPerMs = this.state.locationA && this.state.locationA.speed;

    return convert(speedPerMs).from('m/s').to('km/h');
  }

  render() {
    return <View style={styles.container}>
      {this.state.locationA && this.state.locationB ? <Text style={styles.metersDisplay}>Speed: {this.speedKmPerHour.toFixed(0)} km/h</Text> : <Text style={{ fontSize: 52 }}>Please wait</Text>}
    </View>
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  metersDisplay: {
    fontSize: 32
  }
});