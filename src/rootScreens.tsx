import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProjectList from './projectList';
import PaymentsApp from './paymentsApp/paymentsApp';
import RealmView from './realm/realm';

interface RootStackParams {
  projectList: undefined;
  paymentsApp: undefined;
  realm: undefined;
}

const Stack = createStackNavigator<RootStackParams>();

const RootScreens = () => {
  console.log('RootStack is Coming');
  return (
    <Stack.Navigator
      initialRouteName="projectList"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="projectList" component={ProjectList} />
      <Stack.Screen name="paymentsApp" component={PaymentsApp} />
      <Stack.Screen name="realm" component={RealmView} />
    </Stack.Navigator>
  );
};

export default RootScreens;
