import styled from 'styled-components';
import {View, Text} from 'react-native';
import {CustomThemeProps} from '../App/styled/styles';

export const StyledThemeContainer = styled(View)`
  padding: 30px 0;
`;
export const StyledSwitchWrapper = styled(View)`
  justify-content: space-between;
`;

export const StyledToggleText = styled(Text)<CustomThemeProps>`
  color: ${props => props.theme.text};
  font-size: 18px;
`;
