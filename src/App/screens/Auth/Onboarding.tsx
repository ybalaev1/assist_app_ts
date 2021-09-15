import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import {OnboardingStackParamList} from '../RootStackPrams';
import {Preview} from './Preview';
import AuthScreen from './AuthScreen';
import RegistrationScreen from './Registration';
import MainScreen from '../Main/MainScreen';

const Wrapper = styled(View)`
  flex: 1;
  padding: 30px 0;
  background-color: ${props => props.theme.background};
`;

const Stack = createStackNavigator<OnboardingStackParamList>();

const OnboardingScreen = () => {
  return (
    <Wrapper>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={'BoardComponent'} component={Preview} />
        <Stack.Screen name={'Auth'} component={AuthScreen} />
        <Stack.Screen name={'Registration'} component={RegistrationScreen} />
        <Stack.Screen
          options={{gestureEnabled: false}}
          name={'Main'}
          component={MainScreen}
        />
      </Stack.Navigator>
    </Wrapper>
  );
};

export {OnboardingScreen};
