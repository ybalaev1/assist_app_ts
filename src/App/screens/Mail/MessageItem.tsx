import React, {useEffect, useState} from 'react';
import {Image, Text, View, TouchableOpacity, Animated} from 'react-native';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MailParamList} from '../RootStackPrams';
import axios from 'axios';
import {visibleTabBar} from '../Main/MainScreen';
import {getTime} from '../../../storage/middleware';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import IconIonic from 'react-native-vector-icons/Ionicons';

type mailScreenProp = StackNavigationProp<MailParamList>;

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

type Props = {
  id: any;
};
const MessItem = ({id}: Props) => {
  const navigation = useNavigation<mailScreenProp>();
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
  const [itemData, setData] = useState<any>([]);
  useEffect(() => {
    const currentUser = {
      user: '6131c08d75e362001635886f',
    };
    axios
      .get(`https://assistapp.club/chats/${id}`, {params: currentUser})
      .then((response: any) => {
        const {data} = response.data;
        setData(data);
      });
  }, [id]);

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
  const handleChat = () => {
    visibleTabBar(false);
    navigation.navigate('Message', {data: id});
  };

  return (
    <WrapperItem onPress={handleChat} activeOpacity={0.8}>
      <Swipeable renderRightActions={renderLeftActions}>
        {itemData.user ? (
          <HeadWrapper>
            <UserWrapper>
              <UserImage
                source={
                  itemData.user.image === 'favor'
                    ? require('../../../assets/images/save.png')
                    : itemData.user.image
                    ? {uri: itemData.user.image}
                    : require('../../../assets/images/person.png')
                }
              />
              <WrapperName>
                <UserName>{itemData.user.fullName}</UserName>
                <LatestWrapper>
                  <LastMessageName>{itemData.chat.last_user}</LastMessageName>
                  <LatestWrapper>
                    <LastMessage>
                      {itemData.chat.latestMessage.toString().length > 24
                        ? `${itemData.chat.latestMessage
                            .toString()
                            .replaceAll('\n', ' ')
                            .slice(0, 24)}...`
                        : itemData.chat.latestMessage}
                    </LastMessage>
                    <LastMessageTime>
                      {getTime(Date.parse(itemData.chat.updatedAt))}
                    </LastMessageTime>
                  </LatestWrapper>
                </LatestWrapper>
              </WrapperName>
            </UserWrapper>
          </HeadWrapper>
        ) : (
          <UserName>{'Loading'}</UserName>
        )}
      </Swipeable>
    </WrapperItem>
  );
};

export {MessItem};
