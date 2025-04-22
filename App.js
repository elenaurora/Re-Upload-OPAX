/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
import VisualizationChoice from './screens/VisualizationChoice';
import MuseumsListScreen from './screens/MuseumsListScreen';
import MuseumScreen from './screens/MuseumScreen';
import ArtworksScreen from './screens/ArtworksScreen'
import ArtworkScreen from './screens/ArtworkScreen'
import CreditsScreen from './screens/CreditsScreen';
import SplashScreen from './screens/SplashScreen';
import PermissionsScreen from './screens/PermissionsScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';
import ManualScreen from './screens/ManualScreen';
import MapScreen from './screens/MapScreen';
import ManualBootScreen from './screens/ManualBootScreen';
import PrivacyPolicyBootScreen from './screens/PrivacyPolicyBootScreen';

const Stack = createNativeStackNavigator();

const App = () => {

  const LOGTAG = "App";

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="PermissionsScreen"
      >
        <Stack.Screen
          name="PermissionsScreen"
          component={PermissionsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PrivacyPolicyScreen"
          component={PrivacyPolicyScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MuseumsListScreen"
          component={MuseumsListScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="VisualizationChoice"
          component={VisualizationChoice}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="MuseumScreen"
          component={MuseumScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ArtworksScreen"
          component={ArtworksScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ArtworkScreen"
          component={ArtworkScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CreditsScreen"
          component={CreditsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ManualScreen"
          component={ManualScreen}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ManualBootScreen"
          component={ManualBootScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PrivacyPolicyBootScreen"
          component={PrivacyPolicyBootScreen}
          options={{
            headerShown: false,
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default (App);
