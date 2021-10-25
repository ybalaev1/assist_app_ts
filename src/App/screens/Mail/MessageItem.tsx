import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import styled from 'styled-components';

import {connect, shallowEqual} from 'react-redux';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MailParamList} from '../RootStackPrams';
import {visibleTabBar} from '../Main/MainScreen';
import {getTime} from '../../../storage/middleware';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import IconIonic from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/reducers/rootReduser';
import {getChatById} from '../../../store/mail/chats_actions/chat_actions';
import axios from 'axios';

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
  chat: any;
};
// type Props = {
//   _id?: string;
//   user: {
//     fullName: string;
//     image?: string;
//   };
//   users: string[];
//   favorite: boolean;
//   last_user: string;
//   createdAt: Date;
//   updatedAt: Date;
//   latestMessage:
//     | string
//     | {
//         iv: string;
//         encryptedData: string;
//       };
// };
// const MessItem = ({
//   _id,
//   user,
//   favorite,
//   last_user,
//   latestMessage,
//   updatedAt,
// }: Props) => {
const MessItem = ({chat}: Props) => {
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
  const dispatch = useDispatch();

  const {loading, chat_data, errors} = useSelector(
    (state: RootState) => state.chat_id,
    shallowEqual,
  );
  const [chatData, setChat] = useState(chat_data);
  // const getChat = useCallback(() => {
  // dispatch(getChatById(chat._id));
  //   console.log(chat_data);
  // }, [dispatch, chat._id]);

  useEffect(() => {
    // dispatch(getChatById(chat._id));
    // getChat;
    // console.log(chat_data);
    //   _id,
    //   user,
    //   favorite,
    //   last_user,
    //   latestMessage,
    //   updatedAt,
    // );
    // console.log(chat._id);
    // axios
    //   .get('http://localhost:3000/chats/' + chat._id)
    //   .then((response: any) => {
    //     setChat(response.data.data);
    // });
  }, []);

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
      <Swipeable renderRightActions={renderLeftActions}>
        {chatData.user ? (
          <HeadWrapper>
            <UserWrapper>
              <UserImage
                source={
                  chatData.chat.favorite
                    ? require('../../../assets/images/save.png')
                    : chatData.user.image
                    ? {uri: chatData.user.image}
                    : require('../../../assets/images/person.png')
                }
              />
              <WrapperName>
                <UserName>{chatData.user.fullName}</UserName>
                <LatestWrapper>
                  <LastMessageName>{chatData.last_user}</LastMessageName>
                  <LatestWrapper>
                    <LastMessage>
                      {chatData.latestMessage.toString().length > 24
                        ? `${chatData.latestMessage
                            .toString()
                            .replaceAll('\n', ' ')
                            .slice(0, 24)}...`
                        : chatData.latestMessage}
                    </LastMessage>
                    <LastMessageTime>
                      {getTime(Date.parse(chatData.updatedAt))}
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
