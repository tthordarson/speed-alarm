//@flow
import React from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import Main from './components/main';
import LogViewer from './components/log-viewer';

// TODO - Create a location context which runs on the root of the app and is always tracking
// and vibrating

const Navigator = createDrawerNavigator({
    Home: {
        screen: Main
    },
    Logs: {
        screen: LogViewer
    }
}, {
    drawerBackgroundColor: '#bb7',
    drawerType: 'slide',
    edgeWidth: 10,
    drawerWidth: 100,
    style: {
        paddingTop: 15
    }
});

export default createAppContainer(Navigator);