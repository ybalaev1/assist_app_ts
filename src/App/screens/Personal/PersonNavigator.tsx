import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import {PersonParamList} from '../RootStackPrams';
import {AppInfo} from './AppInfo';
import { Feedback } from './FeedBack';
import Personal from './Person';
import {Setting} from './Setting';
const Wrapper = styled(View)`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

const Stack = createStackNavigator<PersonParamList>();

const PersonNavigator = () => {
  return (
    <Wrapper>
      <Stack.Navigator
        screenOptions={{
          presentation: 'card',
          headerShown: false,
          cardShadowEnabled: true,
          cardOverlayEnabled: true,
          animationTypeForReplace: 'pop',
        }}>
        <Stack.Screen name={'Personal'} component={Personal} />
        <Stack.Screen name={'Setting'} component={Setting} />
        <Stack.Screen name={'AppInfo'} component={AppInfo} />
        <Stack.Screen name={'FeedBack'} component={Feedback} />
      </Stack.Navigator>
    </Wrapper>
  );
};

export {PersonNavigator};
