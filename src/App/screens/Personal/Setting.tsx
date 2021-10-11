import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {getValueStorage, removeItem} from '../../../storage/storage';

import styled from 'styled-components';
import axios from 'axios';
import {api} from '../../../network/api_request';
import { useNavigation } from '@react-navigation/core';

const Wrapper = styled(View)`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

const Touch = styled(TouchableOpacity)`
  padding: 14px;
  background-color: ${props => props.theme.darkblue};
  margin: 14px;
  border-radius: 10px;
`;
const DefText = styled(Text)`
  color: ${props => props.theme.text};
  text-align: center;
`;

const Setting = () => {
  const navigation = useNavigation();

  const removeAccount = () => {
    getValueStorage('user_id').then(user => {
      axios.delete(api.users + '/' + user).then(response => {
        if (response.status === 200) {
          removeItem('user_id').then();
          navigation.navigate('BoardComponent');
        }
      });
    });
  };
  return (
    <Wrapper>
      <Touch onPress={removeAccount}>
        <DefText>{'Delete account'}</DefText>
      </Touch>
    </Wrapper>
  );
};

export {Setting};
