import React from 'react';
import {React$Node} from '../types/AppTypes';
import styled, {ThemeProvider} from 'styled-components';
import {Appearance, KeyboardAvoidingView, StatusBar} from 'react-native';
import {CustomThemeProps, dark, light} from '../App/styled/styles';
import {useSelector} from 'react-redux';
import {getThemeMod} from '../types/theme/selectors/getThemeMode';
import {setThemeMod, ThemeModEnum} from '../types/theme/themeMod.slice';
import {useEffect} from 'react';
import {useAppDispatch} from '../types/theme/utils/useAppDispatch';

const StyledThemeManager = styled(KeyboardAvoidingView)<CustomThemeProps>`
  flex: 1;
  background: ${props => props.theme.background};
  padding-top: 20px;
`;
const {DARK, LIGHT} = ThemeModEnum;
export const ThemeManager = ({children}: {children: React$Node}) => {
  const {themeMode} = useSelector(getThemeMod);
  const dispatch = useAppDispatch();
  const providerTheme = () => {
    if (themeMode === DARK) {
      return dark;
    }
    if (themeMode === LIGHT) {
      return light;
    }
    return;
  };
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) =>
      dispatch(setThemeMod(colorScheme as ThemeModEnum)),
    );
    return () => subscription.remove();
  }, [dispatch]);
  return (
    <ThemeProvider theme={providerTheme}>
      <StatusBar
        barStyle={themeMode === DARK ? 'light-content' : 'dark-content'}
      />
      <StyledThemeManager>{children}</StyledThemeManager>
    </ThemeProvider>
  );
};
