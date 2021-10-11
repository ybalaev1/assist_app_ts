import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import {MailParamList} from '../RootStackPrams';
import {Chat} from './Chat';
import {MessageContainer} from './MessageScreen';

const Wrapper = styled(View)`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

const Stack = createStackNavigator<MailParamList>();

const MessageNavigator = () => {
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
        <Stack.Screen name={'MailContainer'} component={MessageContainer} />
        <Stack.Screen name={'Message'} component={Chat} />
      </Stack.Navigator>
    </Wrapper>
  );
};

export {MessageNavigator};
