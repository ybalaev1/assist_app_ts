import React, {memo, useEffect, useState} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import styled from 'styled-components';

import {useNavigation} from '@react-navigation/native';
import {visibleTabBar} from '../Main/MainScreen';
import {getTime} from '../../../storage/middleware';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import IconIonic from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {api} from '../../../network/api_request';
const UserWrapper = styled(View)`
  flex-direction: row;
`;
const HeadWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;
const WrapperName = styled(View)`
  justify-content: center;
`;
const LatestWrapper = styled(View)`
  flex-direction: row;
`;
const UserImage = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 24px;
`;
const UserName = styled(Text)`
  justify-content: flex-start;
  font-size: 18px;
  padding-left: 14px;
  color: ${props => props.theme.black};
`;
const LastMessageName = styled(Text)`
  font-size: 12px;
  padding-left: 16px;
  font-weight: 600;
  padding-top: 6px;
  color: ${props => props.theme.black};
`;
const LastMessage = styled(Text)`
  font-size: 12px;
  padding-left: 4px;
  padding-top: 6px;
  color: ${props => props.theme.black};
`;
const LastMessageTime = styled(Text)`
  font-size: 10px;
  padding-left: 4px;
  padding-top: 8px;
  text-align: right;
  color: ${props => props.theme.gray};
`;
type ItemProps = {
  chat: any;
};

const CrntItem = ({chat}: ItemProps) => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation();
  const WrapperItem = styled(TouchableOpacity)`
    flex: 1;
    padding: 14px 10px;
    background-color: ${props => props.theme.white};
    border: 0px solid black;
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    margin-horizontal: 6px;
    border-radius: 6px;
    margin: 4px 6px;
  `;
  useEffect(() => {
    setLoading(true);
    axios.get(api.chats + chat._id).then(response => {
      setData(response.data.data);
      setLoading(false);
    });
    console.log(data);
  }, [chat._id]);

  const Icon = styled(IconIonic)`
    color: ${props => props.theme.red};
    padding: 2px 8px;
  `;
  const renderLeftActions = () => {
    return (
      <TouchableOpacity
        style={{justifyContent: 'center'}}
        onPress={() => console.log('swipe')}>
        <Icon name={'trash-outline'} size={24} />
      </TouchableOpacity>
    );
  };
  const handlePressChat = () => {
    visibleTabBar(false);
    navigation.navigate('Message', {data: chat._id});
  };

  return (
    <WrapperItem onPress={handlePressChat} activeOpacity={0.8}>
      {loading ? (
        <UserName>{'Loading'}</UserName>
      ) : (
        <Swipeable renderRightActions={renderLeftActions}>
          {data.user ? (
            <HeadWrapper>
              <UserWrapper>
                <UserImage
                  source={
                    data.favorite
                      ? require('../../../assets/images/save.png')
                      : data.user.image
                      ? {uri: data.user.image}
                      : require('../../../assets/images/person.png')
                  }
                />
                <WrapperName>
                  <UserName>{data.user.fullName}</UserName>
                  {/* <LatestWrapper>
                    <LastMessageName>{data.last_user}</LastMessageName>
                    <LatestWrapper>
                      <LastMessage>
                        {data.latestMessage.toString().length > 24
                          ? `${data.latestMessage
                              .toString()
                              .replaceAll('\n', ' ')
                              .slice(0, 24)}...`
                          : data.latestMessage}
                      </LastMessage>
                      <LastMessageTime>
                        {getTime(Date.parse(data.updatedAt))}
                      </LastMessageTime>
                    </LatestWrapper>
                  </LatestWrapper> */}
                </WrapperName>
              </UserWrapper>
            </HeadWrapper>
          ) : (
            <UserName>{'Loading'}</UserName>
          )}
        </Swipeable>
      )}
    </WrapperItem>
  );
};

export const CrntItemMem = memo(CrntItem);
