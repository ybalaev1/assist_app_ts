import React from 'react';
import {useNavigation, CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabParamList, OnboardingStackParamList} from '../RootStackPrams';
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {TabIconType} from '../../../types/AppTypes';
import {TouchableOpacity, View} from 'react-native';
import IconIonic from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';
import {SearchNavigator} from '../Search/SearchNavigator';
import Personal from '../Personal/Person';
import {useSelector} from 'react-redux';
import {getThemeMod} from '../../../types/theme/selectors/getThemeMode';
import {ThemeModEnum} from '../../../types/theme/themeMod.slice';
import {NewshNavigator} from '../News/NewsNavigator';

type mainScreenProp = CompositeNavigationProp<
  StackNavigationProp<OnboardingStackParamList, 'Main'>,
  BottomTabNavigationProp<BottomTabParamList, 'News'>
>;
const Tabs = createBottomTabNavigator<BottomTabParamList>();

const Wrapper = styled(View)`
  background-color: ${props => props.theme.background};
  justify-content: space-around;
  flex-direction: row;
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  padding: 14px;
  border: 1px ${props => props.theme.darkblue};
  border-bottom-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;
const {DARK} = ThemeModEnum;

function TabBar({state, navigation}): JSX.Element {
  const {themeMode} = useSelector(getThemeMod);
  const IconI = styled(IconIonic)`
    color: ${props =>
      props.isFocused
        ? themeMode === DARK
          ? props.theme.darkblue
          : props.theme.white
        : props.theme.text};
  `;
  const IconCreate = ({sizeIcon, iconName, color, isFocused}: TabIconType) => {
    return (
      <IconI
        name={iconName}
        size={sizeIcon}
        color={color}
        isFocused={isFocused}
      />
    );
  };
  return (
    <Wrapper>
      {state.routes.map(
        (route: {name: string}, index: React.Key | null | undefined) => {
          let iconName = 'newspaper-outline';
          if (route.name === 'Search') {
            iconName = 'search-outline';
          }
          if (route.name === 'Mail') {
            iconName = 'md-mail-outline';
          }
          if (route.name === 'Personal') {
            iconName = 'md-person';
          }
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.name,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                marginBottom: -14,
              }}>
              <IconCreate
                isFocused={isFocused}
                disabled={true}
                iconName={iconName}
                color={'black'}
                sizeIcon={isFocused ? 30 : 26}
              />
            </TouchableOpacity>
          );
        },
      )}
    </Wrapper>
  );
}

const MainScreen = () => {
  const navigation = useNavigation<mainScreenProp>();
  return (
    <Tabs.Navigator
      sceneContainerStyle={{marginBottom: -20}}
      tabBar={props => <TabBar {...props} />}
      initialRouteName={'News'}
      screenOptions={{headerShown: false}}>
      <Tabs.Screen name={'News'} component={NewshNavigator} />
      <Tabs.Screen name={'Search'} component={SearchNavigator} />
      <Tabs.Screen name={'Mail'} component={NewshNavigator} />
      <Tabs.Screen name={'Personal'} component={Personal} />
    </Tabs.Navigator>
  );
};

export default MainScreen;
