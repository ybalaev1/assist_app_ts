import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components';
import IconIonic from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';

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

const Header = (propHead: {
  title: string;
  leftIcon: string;
  rightIcon: string;
  pressR: () => void;
  pressL: () => void;
}) => {
  return (
    <Wrapper>
      <TouchIcon onPress={() => propHead.pressL()}>
        {propHead.leftIcon && <IconI name={propHead.leftIcon} size={24} />}
      </TouchIcon>
      <Title>{propHead.title}</Title>
      <TouchIcon onPress={() => propHead.pressR()}>
        {propHead.rightIcon && <IconI name={propHead.rightIcon} size={24} />}
      </TouchIcon>
    </Wrapper>
  );
};
export {Header};
