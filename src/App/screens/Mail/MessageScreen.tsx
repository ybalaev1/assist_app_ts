import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Header} from '../../../Components/Header/Header';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/core';
import {useDispatch, useSelector} from 'react-redux';
import {getChats} from '../../../store/mail/chats_actions/chat_actions';
import {RootState} from '../../../store/reducers/rootReduser';
import {Loading} from './LoadingComponent';
import {MessagesItems} from './Items';

const Wrapper = styled(View)`
  flex: 1;
  background-color: ${props => props.theme.background};
`;
const MessageContainer = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {loading} = useSelector((state: RootState) => state.chats);

  const [refreshing, setRefreshing] = useState<boolean>(true);
  const getChatsRequest = useCallback(() => {
    setRefreshing(true);
    dispatch(getChats());
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    const unscribe = navigation.addListener('focus', () => {
      getChatsRequest();
    });
    return unscribe;
  }, [getChatsRequest, navigation]);

  return (
    <Wrapper>
      <Header title={'Messenger'} rightIcon={'add'} pressR={getChatsRequest} />
      {loading ? (
        <Loading />
      ) : (
        <MessagesItems
          getChatsRequest={getChatsRequest}
          refreshing={refreshing}
        />
      )}
    </Wrapper>
  );
};
export {MessageContainer};
