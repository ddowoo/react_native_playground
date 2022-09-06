import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootScreens from './src/rootScreens';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootScreens />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
