import React from 'react';
import {View, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/reducers/rootReduser';
import styled from 'styled-components';
import {CrntItemMem} from './ItemChats';

const Wrapper = styled(View)`
  background-color: ${props => props.theme.blue};
`;

const ItemsFlat = styled(FlatList)`
  flex: 1;
  padding-bottom: 120px;
`;
type FlatListProps = {
  getChatsRequest: () => void;
  refreshing: boolean;
};

const MessagesItems = ({getChatsRequest, refreshing}: FlatListProps) => {
  const {chats} = useSelector((state: RootState) => state.chats);
  return (
    <Wrapper>
      <ItemsFlat
        onRefresh={getChatsRequest}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        data={chats}
        renderItem={({item, index}) => {
          return <CrntItemMem key={index} chat={item} />;
        }}
      />
    </Wrapper>
  );
};

export {MessagesItems};
