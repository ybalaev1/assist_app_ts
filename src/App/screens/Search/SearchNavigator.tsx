import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Chat} from '../Mail/Chat';
import {CrntPost} from '../News/CurrentPost';
import {SearchParamList} from '../RootStackPrams';
import SearchScreen from './SearchScreen';
import SearchUser from './SearchUser';
const Stack = createStackNavigator<SearchParamList>();

const SearchNavigator = () => {
  return (
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
        <Stack.Screen name={'GoChat'} component={Chat} />
        <Stack.Screen name={'Info'} component={SearchUser} />
        <Stack.Screen name={'CrntPost'} component={CrntPost} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export {SearchNavigator};
