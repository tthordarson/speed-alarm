//@flow
import Datastore from 'react-native-local-mongodb';

const store = new Datastore({
    filename: 'appstore2'
});

store.loadDatabase();

export type LogEntry = {
    timestamp: Date,
    coordinate: Coordinates,
    calculatedSpeed: number
}

const logCoordinate = (coordinate: Coordinates, calculatedSpeed: number) => {
    store.insert({
        timestamp: new Date(),
        coordinate,
        calculatedSpeed
    });
}

const getLogEntries = (): Promise<LogEntry[]> => {
    return new Promise<LogEntry>((resolve, error) => {
        store.find({}, (err, results) => {
            resolve(results);
        });
    });
}

export { logCoordinate, getLogEntries };