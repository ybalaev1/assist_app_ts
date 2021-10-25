import React from 'react';
import {View, FlatList, Text} from 'react-native';
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
const NonData = styled(Text)`
  font-size: 18px;
  color: ${props => props.theme.black};
  text-align: center;
  padding: 14px;
`;
type FlatListProps = {
  getChatsRequest: () => void;
  refreshing: boolean;
};

const MessagesItems = ({getChatsRequest, refreshing}: FlatListProps) => {
  const {chats} = useSelector((state: RootState) => state.chats);
  return (
    <Wrapper>
      {chats.length ? (
          <ItemsFlat
          onRefresh={getChatsRequest}
          refreshing={refreshing}
          showsVerticalScrollIndicator={false}
          data={chats}
          renderItem={({item, index}) => {
            return <CrntItemMem key={index} chat={item} />;
          }}
        />
      ):
      <NonData>{'No chats :('}</NonData>
      }

    </Wrapper>
  );
};

export {MessagesItems};
