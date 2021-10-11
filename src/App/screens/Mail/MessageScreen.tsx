import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Header} from '../../../Components/Header/Header';
import styled from 'styled-components';
import axios from 'axios';
import {MessItem} from './MessageItem';
import {useNavigation} from '@react-navigation/core';

const Wrapper = styled(View)`
  flex: 1;
  background-color: ${props => props.theme.background};
`;
const ItemsFlat = styled(FlatList)`
  flex: 1;
  padding-bottom: 120px;
`;

const MessageContainer = () => {
  const [chats, setChats] = useState([]);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState<boolean>(true);

  const getChats = useCallback(() => {
    setRefreshing(true);
    const user = {
      id: '6131c08d75e362001635886f',
    };
    axios
      .get('https://assistapp.club/chats', {params: user})
      .then((response: any) => {
        const {data} = response.data;
        const filter = data.sort(
          (a: {updatedAt: number}, b: {updatedAt: number}) => {
            return b.updatedAt > a.updatedAt;
          },
        );
        setChats(filter);
      });
    setRefreshing(false);
  }, []);
  useEffect(() => {
    const unscribe = navigation.addListener('focus', () => {
      getChats();
    });

    return unscribe;
  }, [getChats, navigation]);

  const keyExtractor = (_item: any, index: any) => index;

  return (
    <Wrapper>
      <Header title={'Messenger'} />
      <ItemsFlat
        onRefresh={() => getChats()}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        data={chats}
        keyExtractor={keyExtractor}
        renderItem={({item, index}) => {
          return <MessItem key={index} id={item._id} />;
        }}
      />
    </Wrapper>
  );
};

export {MessageContainer};
