import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/reducers/rootReduser';
import styled from 'styled-components';
import {Dispatch} from 'redux';
import {Header} from '../../../Components/Header/Header';
import {fetchPersonalRequest} from '../../../store/actions/presonalActions/presonalActions';
import {getValueStorage, removeItem} from '../../../storage/storage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {OnboardingStackParamList} from '../RootStackPrams';

const Wrapper = styled(View)`
  flex: 1;
  background-color: ${props => props.theme.background};
  align-content: center;
`;
const ErrorText = styled(Text)`
  text-align: center;
  font-size: 22px;
  color: ${props => props.theme.text};
`;
const WrapperBottom = styled(View)`
  margin-top: 44px;
`;
const WrapperTouch = styled(TouchableOpacity)``;

const UserText = styled(Text)`
  padding-top: 14px;
  font-size: 32px;
`;
// ЗАПОЛНИТЬ ВСЮ ИНФУ ПО ЮЗЕРУ
// ВОЗМОЖНО ПЕРЕНЕСТИ ТАКУЮ ЖЕ ИНФОРМАЦИЮ НА СТРАНИЦУ ПРОФИЛЯ
// ПОПРОБОВАТЬ ЗАРЕГИСТРИРОВАТЬ НОВОГО ПОЛЬЗОВАТЕЛЯ И ПРОВЕРИТЬ ВСЕ ДАННЫЕ
// ПОДТЯНУТЬ ПОСТЫ ПОЛЬЗОВАТЕЛЯ
// ИНФОРМАЦИЯ
// СДЕЛАТЬ ПОДПИСКУ
type personalScreenProps = StackNavigationProp<OnboardingStackParamList>;

const Personal = () => {
  const navigation = useNavigation<personalScreenProps>();
  const dispatch: Dispatch<any> = useDispatch();

  const {personal, pending, error} = useSelector(
    (state: RootState) => state.personal,
    shallowEqual,
  );
  const [loading, setLoading] = useState<boolean>(pending);
  const [user, setUser] = useState<any>([]);

  useEffect(() => {
    getDataCurrentUser();
  }, []);

  const getDataCurrentUser = () => {
    setLoading(true);
    getValueStorage('user_id').then((user_id: any) => {
      dispatch(fetchPersonalRequest(user_id));
      setUser(personal);
      setTimeout(() => {
        setLoading(false);
      }, 1200);
    });
  };
  const logIn = () => {
    removeItem('user_id').then(() => {
      navigation.navigate('BoardComponent');
    });
  };

  return (
    <Wrapper>
      {loading ? (
        <UserText>{'loading'}</UserText>
      ) : error ? (
        <ErrorText>{'Errors :('}</ErrorText>
      ) : (
        <Wrapper>
          <Header
            pressL={navigation.goBack}
            pressR={() => console.log('afks r')}
            title={user.fullName}
            leftIcon={'chevron-back'}
            rightIcon={'ellipsis-horizontal'}
          />
          <UserText>{user.fullName}</UserText>
          <WrapperTouch onPress={logIn}>
            <UserText>{'log out'}</UserText>
          </WrapperTouch>
        </Wrapper>
      )}
      <WrapperBottom />
    </Wrapper>
  );
};

export default Personal;
