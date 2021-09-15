import React from 'react';
import {Switch} from 'react-native';
import {useSelector} from 'react-redux';
import {setThemeMod, ThemeModEnum} from '../types/theme/themeMod.slice';
import {useAppDispatch} from '../types/theme/utils/useAppDispatch';
import {getThemeMod} from '../types/theme/selectors/getThemeMode';
import {
  StyledSwitchWrapper,
  StyledThemeContainer,
  StyledToggleText,
} from './ThemeModeSwith.style';

const {DARK, LIGHT} = ThemeModEnum;

export const ThemeModeSwitch = () => {
  const {themeMode} = useSelector(getThemeMod);
  const dispatch = useAppDispatch();
  return (
    <StyledThemeContainer>
      <StyledSwitchWrapper>
        <StyledToggleText>{'dark mode'}</StyledToggleText>
        <Switch
          value={themeMode === DARK}
          onValueChange={value => {
            dispatch(setThemeMod(value ? DARK : LIGHT));
          }}
        />
      </StyledSwitchWrapper>
    </StyledThemeContainer>
  );
};
