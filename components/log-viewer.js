//@flow
import * as React from 'react';
import { getLogEntries, LogEntry } from '../utilities/logger';
import { View, ScrollView, StyleSheet } from 'react-native';
import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import { Table, Rows, Row } from 'react-native-table-component';
import MapView, { Marker } from 'react-native-maps';

// TODO - Create a context for retrieving log entries

class LogList extends React.Component<{}, { entries: LogEntry[] }> {
    state = {
        entries: []
    }

    componentDidMount() {
        getLogEntries().then(entries => {
            this.setState({entries});
        });
    }

    render() {
        const data = this.state.entries.map((entry: LogEntry) => [
            entry.timestamp.toString(),
            entry.coordinate.latitude.toString(),
            entry.coordinate.longitude.toString(),
            entry.coordinate.speed.toString(),
            entry.calculatedSpeed.toString()
        ]);

        return <View style={styles.container}>
            <ScrollView>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <Row data={['Timestamp', 'Latitude', 'Longitude', 'Speed (native)', 'Speed (calculated)']} style={styles.head} textStyle={styles.text} />
                    <Rows data={data} textStyle={styles.text} />
                </Table>
            </ScrollView>
        </View>
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
  });

class LogMap extends React.Component<{}, { entries: LogEntry[] }> {
    state = {
        entries: []
    }

    componentDidMount() {
        getLogEntries().then(entries => {
            this.setState({entries});
        });
    }

    render() {
        return <View style={styles.container}>
            <MapView>
                {this.state.entries.map(({ coordinate }: LogEntry, index) => <Marker key={index}
                coordinate={coordinate} />)}
            </MapView>
        </View>
    }
}

const LogNavigator = createMaterialTopTabNavigator({
    List: LogList,
    Map: LogMap
});

export default createAppContainer(LogNavigator);