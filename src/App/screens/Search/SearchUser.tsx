import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/reducers/rootReduser';
import styled from 'styled-components';
import {Loading} from './LoadingComponent';
import {Header} from '../../../Components/Header/Header';
import ImageView from 'react-native-image-viewing';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SearchParamList} from '../RootStackPrams';
import {PostItem} from '../../../Components/News/postItem';
import {Dispatch} from 'redux';
import {fetchPostByIdRequest} from '../../../store/actions/postByIdActions/postByIdActions';
import LinearGradient from 'react-native-linear-gradient';
import {DefImgUsr} from '../../../Components/Default/DefaultImage';
import {SearchUsrModalize} from './Modalize';
import {subscribeRequest} from '../../../store/actions/activitesActions/activitesActions';
import {fetchUserById} from '../../../store/actions/userByIdActions/userByIdActions';
import {visibleTabBar} from '../Main/MainScreen';
import { createChat } from '../../../network/api_request';
// import { joinRoom } from '../../../network/socket';
// import {socketFollow} from '../../../network/socket';

type searchUserScreenProp = StackNavigationProp<SearchParamList>;
type Props = {
  route: any;
};
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

const WrapperTouch = styled(TouchableOpacity)`
  padding: 12px 0;
  padding-bottom: 0;
  width: 50%;
`;
const WrapperBtn = styled(View)`
  flex-direction: row;
  justify-content: space-around;
`;
const FollowText = styled(Text)`
  font-size: 18px;
  padding: 14px;
  text-align: center;
  color: ${props => props.theme.white};
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

const ItemsFlat = styled(FlatList)`
  flex: 1;
  padding-bottom: 120px;
`;
const SearchUser = ({route}: Props) => {
  const {id} = route.params;
  const navigation = useNavigation<searchUserScreenProp>();
  const [fullScreen, setFull] = useState(false);
  const [openMod, setMod] = useState(false);

  const {pending, data, error} = useSelector(
    (state: RootState) => state.postById,
    shallowEqual,
  );
  const {loading} = useSelector(
    (state: RootState) => state.subscribe,
    shallowEqual,
  );
  const {id_data, load_user} = useSelector(
    (state: RootState) => state.user_byId,
    shallowEqual,
  );
  const {personal} = useSelector(
    (state: RootState) => state.personal,
    shallowEqual,
  );
  const dispatch: Dispatch<any> = useDispatch();
  const getData = useCallback(() => {
    dispatch(fetchUserById(id._id));
  }, [dispatch, id._id]);

  useEffect(() => {
    dispatch(fetchPostByIdRequest(id._id));
    getData();
  }, [dispatch, getData, id._id]);

  const onClose = () => {
    setMod(false);
  };
  const startFollow = () => {
    const id_f = {
      id_follow: personal._id,
    };
    // subscribeRequest()
  };
  const startMessaging = () => {
    // createChat(id._id);
    navigation.navigate('GoChat', {userName: id.fullName, data: id._id});
    visibleTabBar(false);
  };
  
  const keyExtractor = (_item: any, index: any) => index;
  const headerComponent = () => {
    return (
      <Wrapper>
        {load_user ? (
          <Loading />
        ) : (
          <Wrapper>
            <ImageView
              imageIndex={0}
              images={[
                id_data.image
                  ? {uri: id_data.image}
                  : require('../../../assets/images/person.png'),
              ]}
              visible={fullScreen}
              onRequestClose={() => setFull(false)}
            />
            <WrapperUser>
              <DefImgUsr image={id_data.image} />
              <Wrapper>
                <UserText>{id_data.fullName}</UserText>
                <WrapperActivity>
                  <Background
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    colors={['#0887cc', '#0B4257']}>
                    <TextAct>
                      {id_data.following ? id_data.following.length : 0}
                    </TextAct>
                    <TextAct>{'Following'}</TextAct>
                  </Background>
                  <Background
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    colors={['#0B4257', '#0887cc']}>
                    <TextAct>
                      {id_data.followers ? id_data.followers.length : 0}
                    </TextAct>
                    <TextAct>{'Followers'}</TextAct>
                  </Background>
                </WrapperActivity>
              </Wrapper>
            </WrapperUser>
            <WrapperBtn>
              <WrapperTouch onPress={startFollow}>
                {loading ? (
                  <Loading />
                ) : (
                  <Background
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    colors={['rgba(152, 212, 234, 0.82)', '#0B4257']}>
                    <FollowText>{'Set follow'}</FollowText>
                  </Background>
                )}
              </WrapperTouch>
              <WrapperTouch onPress={startMessaging}>
                <Background
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  colors={['#0B4257', 'rgba(152, 212, 234, 0.82)']}>
                  <FollowText>{'Start chating'}</FollowText>
                </Background>
              </WrapperTouch>
            </WrapperBtn>

            <WrapperInf>
              <TextInf>{id_data.information}</TextInf>
            </WrapperInf>
          </Wrapper>
        )}
      </Wrapper>
    );
  };
  return (
    <Wrapper>
      {load_user ? (
        <Loading />
      ) : (
        <Wrapper>
          <ImageView
            imageIndex={0}
            images={[
              id_data.image
                ? {uri: id_data.image}
                : require('../../../assets/images/person.png'),
            ]}
            visible={fullScreen}
            onRequestClose={() => setFull(false)}
          />
          <Header
            pressL={navigation.goBack}
            pressR={() => setMod(true)}
            title={id_data.fullName}
            leftIcon={'chevron-back'}
            rightIcon={'ellipsis-horizontal'}
          />
          {pending ? (
            <Loading />
          ) : error ? (
            <WrapperBottom>
              <ErrorText>{'Errors :('}</ErrorText>
            </WrapperBottom>
          ) : (
            <ItemsFlat
              ListHeaderComponent={headerComponent}
              showsVerticalScrollIndicator={false}
              data={data}
              keyExtractor={keyExtractor}
              renderItem={({item, index}) => (
                <PostItem pending={pending} post={item} key={index} />
              )}
            />
          )}
          {openMod && (
            <SearchUsrModalize handleClosed={onClose} user={id_data} />
          )}
          <WrapperBottom />
        </Wrapper>
      )}
    </Wrapper>
  );
};

export default SearchUser;
