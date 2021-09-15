/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';

import 'react-native-gesture-handler';
import {React$Node} from '../types/AppTypes';
import {createStackNavigator} from '@react-navigation/stack';
import {OnboardingStackParamList} from './screens/RootStackPrams';
import {NavigationContainer} from '@react-navigation/native';

import {OnboardingScreen} from './screens/Auth/Onboarding';
import {ThemeManager} from '../Components/ThemeManager';
import {LogBox} from 'react-native';

const Stack = createStackNavigator<OnboardingStackParamList>();
const App: () => React$Node = () => {
  LogBox.ignoreAllLogs();
  return (
    <ThemeManager>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name={'BoardComponent'} component={OnboardingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeManager>
  );
};

export default App;
