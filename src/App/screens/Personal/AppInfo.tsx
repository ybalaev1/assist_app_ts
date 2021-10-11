import React from 'react';
import {Image, Text, View} from 'react-native';
import {Header} from '../../../Components/Header/Header';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';

const Wrapper = styled(View)`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

const ItemInfo = styled(View)``;
const TextItem = styled(Text)`
  font-size: 18px;
  color: ${props => props.theme.text};
  padding: 14px;
  text-align: center;
`;
const Version = styled(View)`
  position: absolute;
  bottom: 100px;
  left: 4px;
  right: 4px;
  align-items: center;
`;
const WrapperImage = styled(Image)`
  align-self: center;
  height: 200px;
  width: 200px;
`;
const AppInfo = () => {
  const navigation = useNavigation();
  return (
    <Wrapper>
      <Header
        pressL={() => navigation.goBack()}
        title={'App information'}
        leftIcon={'chevron-back'}
      />
      <ItemInfo>
        <TextItem>
          {
            'App created at React TypeScript.\nPasswords as well as all your messages are encrypted.'
          }
        </TextItem>
        <TextItem>
          {
            'The application was developed to find new acquaintances in order to obtain useful information, as well as to help other people from all over the world. Share useful articles, acquaintances, information and request useful data yourself. In order to complain about the content, do not forget to talk about it. Let`s do it all together'
          }
        </TextItem>
        <TextItem>
          {'We are waiting for all questions and suggestions in the feedback.'}
        </TextItem>
      </ItemInfo>
      <WrapperImage source={require('../../../assets/images/logo.png')} />
      <Version>
        <TextItem>{'Version: 1.0'}</TextItem>
      </Version>
    </Wrapper>
  );
};

export {AppInfo};
