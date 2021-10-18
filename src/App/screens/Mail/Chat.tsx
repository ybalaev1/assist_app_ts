import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  TextInput,
  View,
  KeyboardAvoidingView,
  FlatList,
  Text,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {Header} from '../../../Components/Header/Header';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {visibleTabBar} from '../Main/MainScreen';
import IconIonic from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {RenderUserMessage} from './MessageUserMessage';
import {getChatById} from '../../../store/mail/chats_actions/chat_actions';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/reducers/rootReduser';
import {getMessages} from '../../../store/mail/message_actions/message_actions';

const UserWrapper = styled(View)``;

const WrapperKeyboard = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: ${props => props.theme.background};
  align-content: center;
  justify-content: space-around;
`;
type Props = {
  route: any;
};
const Input = styled(TextInput)`
  width: 80%;
  border: 0 solid black;
  border-radius: 10px;
  background-color: ${props => props.theme.secondary};
  padding-left: 14px;
  height: ${props => props.height}px;
  min-height: 30px;
  max-height: 300px;
  font-size: 16px;
`;
const InputWrapper = styled(View)`
  flex-direction: row;
  margin: 14px 10px;
  justify-content: space-around;
  margin-bottom: 40px;
`;
const IconWrapper = styled(View)`
  justify-content: center;
`;
const IconI = styled(IconIonic)`
  color: ${props => (props.color ? props.theme.lightgray : props.theme.text)};
  padding-top: 4px;
`;
const ChatWrapper = styled(FlatList)``;
const RemoveWrapper = styled(TouchableOpacity)`
  background-color: ${props => props.theme.red};
  margin: 14px 10px;
  align-self: center;
  justify-content: center;
  margin-bottom: 40px;
  border-radius: 14px;
`;
const RemoveText = styled(Text)`
  color: #fff;
  padding: 8px 10px;
  font-size: 16px;
`;
const Chat = ({route}: Props) => {
  const navigation = useNavigation();
  const {data} = route.params;
  const onHandleBack = () => {
    navigation.goBack();
    visibleTabBar(true);
  };
  const flatListRef = useRef({
    x: 0,
    y: 0,
    animated: true,
  });
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [heightInput, setHeightInput] = useState(0);
  const [iconColor, setIconColor] = useState<boolean>(false);
  const [iconRemove, setIconRemove] = useState<boolean>(false);
  // const [messages, setMessage] = useState<any>([]);
  const dispatch = useDispatch();

  const {loading, messages, errors} = useSelector(
    (state: RootState) => state.messages,
    shallowEqual,
  );
  const {chat_data} = useSelector(
    (state: RootState) => state.chat_id,
    shallowEqual,
  );
  const sendMessage = () => {
    const mes = {
      message: text,
      chat_id: data,
      user_id: '616407104da767ce25143cb7',
    };
    setText('');
    if (text.length > 0) {
      axios.post(`http://localhost:3000/chats/${data}`, {data: mes}).then();
    }
    getDataChat();
  };
  const keyExtractor = (_item: any, index: any) => index;

  const getDataChat = useCallback(() => {
    dispatch(getMessages(data));
    dispatch(getChatById(data));
    setTitle(chat_data.user.fullName);

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({animated: true});
    }, 500);
  }, [chat_data.user.fullName, data, dispatch]);
  const removeMessagById = (id: string) => {
    axios.delete(`http://localhost:3000/messages/${id}`).then();
    getDataChat();
  };

  useEffect(() => {
    getDataChat();
    Keyboard.addListener('keyboardDidShow', () => {
      flatListRef.current?.scrollToEnd({animated: true});
    });
    const unscribe = navigation.addListener('beforeRemove', () => {
      visibleTabBar(true);
    });
    return unscribe;
  }, [navigation, getDataChat]);

  return (
    <WrapperKeyboard behavior={'padding'} keyboardVerticalOffset={20}>
      <Header
        title={title}
        pressL={onHandleBack}
        leftIcon={'chevron-back'}
        rightIcon={'ellipsis-horizontal'}
      />
      <ChatWrapper
        showsVerticalScrollIndicator={false}
        ref={flatListRef}
        data={messages}
        keyExtractor={keyExtractor}
        renderItem={({item, index}) => {
          return (
            <UserWrapper key={index}>
              <RenderUserMessage
                removeMessage={id => removeMessagById(id)}
                iconRemove={value => setIconRemove(value)}
                id={item.user_id}
                info={item}
              />
            </UserWrapper>
          );
        }}
      />
      <InputWrapper>
        <IconWrapper>
          <IconI
            name={'add-circle-outline'}
            size={22}
            onPress={() => sendMessage()}
          />
        </IconWrapper>
        <Input
          height={heightInput}
          onContentSizeChange={event => {
            setHeightInput(event.nativeEvent.contentSize.height);
          }}
          multiline
          placeholder={'Press type a message...'}
          value={text}
          onChangeText={value => {
            setText(value);
            if (value.length) {
              setIconColor(false);
            } else {
              setIconColor(true);
            }
          }}
        />
        <IconWrapper>
          <IconI
            disabled={iconColor}
            color={iconColor}
            name={'arrow-forward-circle-outline'}
            size={22}
            onPress={() => sendMessage()}
          />
        </IconWrapper>
      </InputWrapper>
      {/* <RemoveWrapper>
          <RemoveText>{'Delete messages'}</RemoveText>
        </RemoveWrapper> */}
    </WrapperKeyboard>
  );
};

export {Chat};
