import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import IconIonic from 'react-native-vector-icons/Ionicons';

const Wrapper = styled(View)`
  background-color: ${props => props.theme.background};
  border: 0 ${props => props.theme.black};
  border-bottom-width: 0.5px;
  flex-direction: row;
  justify-content: space-between;
  padding: 12px;
`;
const Title = styled(Text)`
  font-size: 18px;
  color: ${props => props.theme.text};
  text-align: center;
  padding-right: 12px;
  font-weight: bold;
`;
const IconI = styled(IconIonic)`
  color: ${props => props.theme.text};
`;
const TouchIcon = styled(TouchableOpacity)``;
interface Props {
  title: string;
  leftIcon?: string;
  rightIcon?: string;
  pressR?: () => void;
  pressL?: () => void;
}

const Header = ({title, leftIcon, rightIcon, pressR, pressL}: Props) => {
  return (
    <Wrapper>
      <TouchIcon onPress={pressL}>
        {leftIcon && <IconI name={leftIcon} size={24} />}
      </TouchIcon>
      <Title>{title}</Title>
      <TouchIcon onPress={pressR}>
        {rightIcon && <IconI name={rightIcon} size={24} />}
      </TouchIcon>
    </Wrapper>
  );
};
export {Header};
