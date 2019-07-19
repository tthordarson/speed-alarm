//@flow
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#ccc',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});

const DrawerMenu = () => <View style={styles.view}>
    <Text style={styles.text}>Settings</Text>
</View>

export default DrawerMenu;