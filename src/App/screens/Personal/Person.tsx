import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
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
import {DefImgUsr} from '../../../Components/Default/DefaultImage';
import LinearGradient from 'react-native-linear-gradient';

import {UsrModalize} from './Modalize';
import {fetchPostByIdRequest} from '../../../store/actions/postByIdActions/postByIdActions';
import {PostItem} from '../../../Components/News/postItem';
import {PostModalize} from './ModalizePost';

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
const WrapperTouch = styled(TouchableOpacity)`
  background-color: ${props => props.theme.white};
  margin: 10px;
  border: 0px solid black;
  border-radius: 14px;
`;
const WrapperUser = styled(View)`
  padding: 14px 4px;
  margin: 0 14px;
  flex-direction: row;
  justify-content: space-around;
`;

const UserText = styled(Text)`
  padding: 14px;
  font-size: 32px;
  text-align: center;
  color: ${props => props.theme.text};
`;
const WrapperActivity = styled(View)`
  flex-direction: row;
  justify-content: center;
`;
const Background = styled(LinearGradient)`
  border: 0px solid ${props => props.theme.black};
  border-radius: 14px;
  margin: 0 10px;
`;

const TextAct = styled(Text)`
  color: ${props => props.theme.white};
  padding: 4px 12px;
  font-size: 12px;
  text-align: center;
`;

const WrapperInf = styled(View)`
  border: 0px solid ${props => props.theme.black};
  border-bottom-width: 0.5px;
  padding: 6px 0;
  margin: 6px;
`;
const TextInf = styled(Text)`
  padding: 6px 14px;
  font-size: 16px;
  color: ${props => props.theme.text};
`;

type personalScreenProps = StackNavigationProp<OnboardingStackParamList>;

const Personal = () => {
  const navigation = useNavigation<personalScreenProps>();
  const dispatch: Dispatch<any> = useDispatch();
  const [openMod, setMod] = useState(false);
  const [openModPost, setModPost] = useState(false);

  const {personal, pending, error} = useSelector(
    (state: RootState) => state.personal,
    shallowEqual,
  );
  const {data} = useSelector(
    (state: RootState) => state.postById,
    shallowEqual,
  );
  const onClose = () => {
    setMod(false);
  };
  const getData = useCallback(() => {
    getValueStorage('user_id').then((id: any) => {
      dispatch(fetchPersonalRequest(id));
      dispatch(fetchPostByIdRequest(id));
    });
  }, [dispatch]);

  useEffect(() => {
    const unscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unscribe;
  }, [getData, navigation]);

  const logOut = () => {
    removeItem('user_id').then(() => {
      navigation.navigate('BoardComponent');
    });
  };

  const ItemsFlat = styled(FlatList)`
    flex: 1;
    padding-bottom: 120px;
  `;
  const keyExtractor = (_item: any, index: any) => index;

  return (
    <Wrapper>
      {pending ? (
        <UserText>{'loading'}</UserText>
      ) : error ? (
        <WrapperBottom>
          <ErrorText>{'Errors :('}</ErrorText>
        </WrapperBottom>
      ) : (
        <Wrapper>
          <Header
            pressR={() => setMod(true)}
            title={personal.fullName}
            rightIcon={'ellipsis-horizontal'}
          />
          <WrapperUser>
            <DefImgUsr image={personal.image} />
            <Wrapper>
              <UserText>{personal.fullName}</UserText>
              <WrapperActivity>
                <Background
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  colors={['#0887cc', '#0B4257']}>
                  <TextAct>
                    {personal.following ? personal.following.length : 0}
                  </TextAct>
                  <TextAct>{'Following'}</TextAct>
                </Background>
                <Background
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  colors={['#0B4257', '#0887cc']}>
                  <TextAct>
                    {personal.followers ? personal.followers.length : 0}
                  </TextAct>
                  <TextAct>{'Followers'}</TextAct>
                </Background>
              </WrapperActivity>
            </Wrapper>
          </WrapperUser>
          <WrapperInf>
            <TextInf>{personal.information}</TextInf>
          </WrapperInf>
          <ItemsFlat
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={keyExtractor}
            renderItem={({item, index}) => (
              <PostItem
                openModal={() => setModPost(true)}
                pending={pending}
                post={item}
                key={index}
              />
            )}
          />
        </Wrapper>
      )}

      {openMod && (
        <UsrModalize
          handleClosed={onClose}
          logout={logOut}
          name={personal.fullName}
        />
      )}
      {openModPost && (
        <PostModalize
          handleClosed={() => setModPost(false)}
          logout={logOut}
          name={personal.fullName}
        />
      )}
    </Wrapper>
  );
};

export default Personal;
