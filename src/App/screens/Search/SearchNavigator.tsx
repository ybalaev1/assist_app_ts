import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import { CrntPost } from '../News/CurrentPost';
import {Routes, SearchParamList} from '../RootStackPrams';
import SearchScreen from './SearchScreen';
import SearchUser from './SearchUser';

const Wrapper = styled(View)`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

const Stack = createStackNavigator<SearchParamList>();

const SearchNavigator = () => {
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
        <Stack.Group>
          <Stack.Screen name={'Search'} component={SearchScreen} />
          <Stack.Screen name={'SearchUser'} component={SearchUser} />
        </Stack.Group>
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen name={'Info'} component={SearchUser} />
          <Stack.Screen name={'CrntPost'} component={CrntPost} />
        </Stack.Group>
      </Stack.Navigator>
    </Wrapper>
  );
};

export {SearchNavigator};
