import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Header} from '../../../Components/Header/Header';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Fontisto';

const Wrapper = styled(View)`
  flex: 1;
  background-color: ${props => props.theme.background};
`;
const WrpItem = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: space-between;
  background-color: ${props => props.theme.white};
  margin: 8px 24px;
  border: 0px solid black;
  border-radius: 12px;
`;
const TextItem = styled(Text)`
  font-size: 18px;
  color: ${props => props.theme.text};
  padding: 10px 24px;
  text-align: center;
`;
const IconI = styled(Icon)`
  color: ${props => props.theme.darkblue};
  padding: 10px 24px;
`;
const Feedback = () => {
  const navigation = useNavigation();
  return (
    <Wrapper>
      <Header
        pressL={() => navigation.goBack()}
        title={'FeedBack'}
        leftIcon={'chevron-back'}
      />
      <WrpItem>
        <TextItem>{'telegram'}</TextItem>
        <IconI name={'telegram'} size={24} />
      </WrpItem>
      <WrpItem>
        <TextItem>{'mail'}</TextItem>
        <IconI name={'email'} size={24} />
      </WrpItem>
      <WrpItem>
        <TextItem>{'web-site'}</TextItem>
        <IconI name={'world-o'} size={24} />
      </WrpItem>
    </Wrapper>
  );
};

export {Feedback};
