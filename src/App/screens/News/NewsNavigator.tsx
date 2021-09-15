import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import {NewsParamList} from '../RootStackPrams';
import {CrntPost} from './CurrentPost';
import NewsScreen from './NewsScreen';

const Wrapper = styled(View)`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

const Stack = createStackNavigator<NewsParamList>();

const NewshNavigator = () => {
  return (
    <Wrapper>
      <Stack.Navigator
        screenOptions={{
          presentation: 'modal',
          headerShown: false,
          cardShadowEnabled: true,
          cardOverlayEnabled: true,
          animationTypeForReplace: 'pop',
        }}>
        <Stack.Group>
          <Stack.Screen name={'News'} component={NewsScreen} />
          <Stack.Screen name={'CrntPost'} component={CrntPost} />
        </Stack.Group>
      </Stack.Navigator>
    </Wrapper>
  );
};

export {NewshNavigator};
