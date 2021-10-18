import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Image, Text} from 'react-native';
import styled from 'styled-components';
import {StackNavigationProp} from '@react-navigation/stack';
import {OnboardingStackParamList} from '../RootStackPrams';
import {TouchableOpacity} from 'react-native';
import {RootState} from 'src/store/reducers/rootReduser';
import {useDispatch, useSelector} from 'react-redux';
import {getValueStorage} from '../../../storage/storage';
import {Dispatch} from 'redux';
import {fetchPersonalRequest} from '../../../store/actions/presonalActions/presonalActions';
import {initWebSocket} from '../../../network/socket';
import {visibleTabBar} from '../Main/MainScreen';
import axios from 'axios';
import { api } from '../../../network/api_request';
const Wrapper = styled(View)`
  flex: 1;
  padding: 30px 0;
  background-color: ${props => props.theme.background};
`;
const CenterComponent = styled(View)`
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  padding-vertical: 40px;
  margin-top: 30px;
`;
const TextCom = styled(Text)`
  color: ${props => props.theme.text};
  font-size: 30px;
  padding-vertical: 40px;
  text-align: center;
`;

const TextPress = styled(Text)`
  color: ${props => props.theme.black};
  font-size: 24px;
  text-align: center;
  padding-vertical: 14px;
`;
const ImageComponent = styled(Image)`
  width: 200px;
  height: 200px;
`;

const Button = styled(TouchableOpacity)`
  margin-horizontal: 20px;
  background-color: ${props => props.theme.white};
  border: 0.5px solid ${props => props.theme.white};
  border-radius: 14px;
  margin-top: 30px;
`;

type boardProps = StackNavigationProp<
  OnboardingStackParamList,
  'BoardComponent'
>;

const Preview = () => {
  const navigation = useNavigation<boardProps>();
  const {themeMode} = useSelector((state: RootState) => state.themeMode);
  const dispatch: Dispatch<any> = useDispatch();
  useEffect(() => {
    getValueStorage('tokenAuth').then(token => {
      if (!token) {
        setTimeout(() => {
          navigation.navigate('Registration');
        }, 2000);
      } else {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };
        axios.defaults.headers = headers;
        getValueStorage('user_id').then((id: any) => {
          dispatch(fetchPersonalRequest(id));
          visibleTabBar(true);
          navigation.navigate('Main');
        });
      }
    });
  }, [navigation]);
  return (
    <Wrapper>
      <CenterComponent>
        <TextCom>{'merge contact`s'.toUpperCase()}</TextCom>
        <ImageComponent
          source={
            themeMode === 'dark'
              ? require('../../../assets/images/earth_w.png')
              : require('../../../assets/images/earth.png')
          }
          height={200}
          width={200}
        />
        <TextCom>{'around the world'.toUpperCase()}</TextCom>
      </CenterComponent>
      <Button
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Registration')}>
        <TextPress>{'Proceed'}</TextPress>
      </Button>
    </Wrapper>
  );
};

export {Preview};
