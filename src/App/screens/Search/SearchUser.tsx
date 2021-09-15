import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/reducers/rootReduser';
import styled from 'styled-components';
import {Loading} from './LoadingComponent';
import {Header} from '../../../Components/Header/Header';
import ImageView from 'react-native-image-viewing';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SearchParamList} from '../RootStackPrams';
import {PostItem} from '../../../Components/News/postItem';
import {Dispatch} from 'redux';
import {fetchPostByIdRequest} from '../../../store/actions/postByIdActions/postByIdActions';
import {getValueStorage} from '../../../storage/storage';
import store from '../../../store/Store';

const Wrapper = styled(View)`
  flex: 1;
  background-color: ${props => props.theme.background};
  align-content: center;
`;

const WrapperImage = styled(Image)`
  align-self: center;
  height: 150px;
  width: 150px;
  border-radius: 50px;
  align-self: flex-start;
`;
const ErrorText = styled(Text)`
  text-align: center;
  font-size: 22px;
  color: ${props => props.theme.text};
`;
const WrapperBottom = styled(View)`
  margin-top: 44px;
`;
const ImageTouch = styled(TouchableOpacity)``;
const WrapperInfo = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  padding-bottom: 30px;
`;
const UserText = styled(Text)`
  padding-top: 14px;
  font-size: 32px;
  color: ${props => props.theme.text};
`;
// ЗАПОЛНИТЬ ВСЮ ИНФУ ПО ЮЗЕРУ
// ВОЗМОЖНО ПЕРЕНЕСТИ ТАКУЮ ЖЕ ИНФОРМАЦИЮ НА СТРАНИЦУ ПРОФИЛЯ
// ПОДТЯНУТЬ ПОСТЫ ПОЛЬЗОВАТЕЛЯ
// ИНФОРМАЦИЯ
// СДЕЛАТЬ ПОДПИСКУ
type searchUserScreenProp = StackNavigationProp<SearchParamList>;
type Props = {
  route: any;
};
const ItemsFlat = styled(FlatList)`
  flex: 1;
  padding-bottom: 120px;
`;

const SearchUser = ({route}: Props) => {
  const {id} = route.params;
  const navigation = useNavigation<searchUserScreenProp>();
  const [fullScreen, setFull] = useState(false);

  const {error} = useSelector(
    (state: RootState) => state.personal,
    shallowEqual,
  );
  const {pending, post} = useSelector(
    (state: RootState) => state.postById,
    shallowEqual,
  );
  const [loading, setLoading] = useState<boolean>(pending);
  const [user, setUser] = useState<any>(id);
  const [postsUser, setPosts] = useState<any>([]);
  const dispatch: Dispatch<any> = useDispatch();
  const st = store.getState();
  const getPostsByUser = useCallback(() => {
    // getValueStorage('user_id').then((user_id: any) => {
    // console.log('user id', user_id);
    dispatch(fetchPostByIdRequest(id._id));
    setTimeout(() => {
      setLoading(false);
    }, 1200);
    // });
    setPosts(st.postById.post);
  }, [dispatch, id._id]);

  const getDataCurrentUser = useCallback(() => {
    setUser(id);
    getPostsByUser();
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, [getPostsByUser, id, user]);
  const logIn = () => {
    console.log('logIn', user);

    // dispatch(fetchPostByIdRequest(id._id));

    // getPostsByUser();
    // get post by id
    // navigation.navigate('Info', {id: id}); // id === полная инфа юзера
  };
  useEffect(() => {
    getDataCurrentUser();
  }, [getDataCurrentUser]);

  const keyExtractor = (item: any, index: any) => index;

  return (
    <Wrapper>
      <ImageView
        imageIndex={0}
        images={[
          user.image
            ? {uri: user.image}
            : require('../../../assets/images/person.png'),
        ]}
        visible={fullScreen}
        onRequestClose={() => setFull(false)}
      />
      <Header
        pressL={navigation.goBack}
        pressR={logIn}
        title={user.fullName}
        leftIcon={'chevron-back'}
        rightIcon={'ellipsis-horizontal'}
      />
      <ItemsFlat
        // eslint-disable-next-line react-native/no-inline-styles
        ListHeaderComponentStyle={{marginTop: 14}}
        ListHeaderComponent={
          loading ? (
            <Loading />
          ) : error ? (
            <ErrorText>{'Errors :('}</ErrorText>
          ) : (
            <WrapperInfo>
              <ImageTouch
                activeOpacity={0.7}
                onPress={() =>
                  user.image ? console.log('set full') : setFull(true)
                }>
                <WrapperImage
                  source={
                    user.image
                      ? {uri: user.image}
                      : require('../../../assets/images/person.png')
                  }
                  resizeMode={'cover'}
                />
              </ImageTouch>
              <UserText>{user.fullName}</UserText>
            </WrapperInfo>
          )
        }
        showsVerticalScrollIndicator={false}
        data={postsUser}
        keyExtractor={keyExtractor}
        renderItem={({item, index}) => (
          <PostItem pending={pending} post={item} key={index} />
        )}
      />

      <WrapperBottom />
    </Wrapper>
  );
};

export default SearchUser;
