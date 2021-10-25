import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  TextInput,
  View,
  KeyboardAvoidingView,
  FlatList,
  Text,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Header} from '../../../Components/Header/Header';
import styled from 'styled-components';
import {useNavigation, useScrollToTop} from '@react-navigation/native';
import {visibleTabBar} from '../Main/MainScreen';
import IconIonic from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {RenderUserMessage} from './MessageUserMessage';
import {getChatById} from '../../../store/mail/chats_actions/chat_actions';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/reducers/rootReduser';
import socketIoClient from "socket.io-client";
import {getValueStorage} from '../../../storage/storage';

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

const socket = socketIoClient("http://localhost:3000", { autoConnect: false });
// const socket = socketIoClient("https://assistapp.club", { autoConnect: false });

const Chat = ({route}: Props) => {
  const navigation = useNavigation();
  const {data} = route.params;
  const onHandleBack = () => {
    socket.disconnect();
    navigation.goBack();
    visibleTabBar(true);
  };
  const flatListRef = useRef(null);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [typing, setTypping] = useState<any>('');
  const [heightInput, setHeightInput] = useState(0);
  const [iconColor, setIconColor] = useState<boolean>(false);
  const [iconRemove, setIconRemove] = useState<boolean>(false);
  const dispatch = useDispatch();
 
 
  const {loading, messages, errors} = useSelector(
    (state: RootState) => state.messages,
    shallowEqual,
  );
  const {chat_id} = useSelector(
    (state: RootState) => state.chat_id,
    shallowEqual,
  );
  const [messagesArray, setMessages] = useState([]);
  const sendMessageValue = () => {

    getValueStorage('user_id').then(user_id => {
      const mes = {
        message: text,
        chat_id: data._id,
        user_id: user_id,
      };

      if (!text) return;

      socket.emit("message", mes);
      setText('');
    });

    // dispatch(sendMessage(mes));

    // if (text.length > 0) {
    //   axios.post(`http://localhost:3000/chats/${chat_id.chat._id}`, {data: mes}).then();
    // }
    // getDataChat();

  };
  const addMessage = (msg: any) => {
    // setMessages(msgs => [ ...msgs, msg ]);
    // setMessage(oldMessages => [...oldMessages, msg]);
    setMessages(oldMessages => [...oldMessages, ...(Array.isArray(msg) ? msg : [msg])]);
    flatListRef.current?.scrollToEnd({animated: true});
  };

  const keyExtractor = (_item: any, index: any) => index;

  // const getDataChat = useCallback(() => {
  //   // dispatch(getMessages(data));
  //   // dispatch(getChatById(data));
  //   setTimeout(() => {
  //     flatListRef.current?.scrollToEnd({animated: true});
  //     // setTitle(chat_id.user.fullName);
  //   }, 500);
  // }, [ data, dispatch]);
  // const removeMessagById = (id: string) => {
  //   axios.delete(`http://localhost:3000/messages/${id}`).then();
  //   getDataChat();
  // };

  useEffect(() => {
  socket.connect();
  socket.emit("latest", data._id);

  getValueStorage('user_id').then(user_id => {
    socket.emit("init", user_id);
  });
  dispatch(getChatById(data._id));
    Keyboard.addListener('keyboardDidShow', () => {
      flatListRef.current?.scrollToEnd({animated: true});
      onHandleTyping();
    });
    Keyboard.addListener('keyboardDidHide', () => {
      socket.emit('notyping');
    });
    const unscribe = navigation.addListener('beforeRemove', () => {
      visibleTabBar(true);
    });
    setTimeout(() => {
    //   flatListRef.current?.scrollToEnd({animated: true});
      if (chat_id && chat_id.user) {
        setTitle(chat_id.user.fullName);
      }
    }, 2500);
    socket.on("latest", (conversation: any) => {
      // expect server to send us the latest messages
      addMessage(conversation);
  });
  socket.on("message", (message: any) => {
    addMessage(message);
});
  // socket.on("recieved_msg", (msg) => {
  //   // console.log('recieved', msg)
  //     addMessage(msg);
  // });
    // socket.on("send_msg", (msg) => {
    //   addMessage(msg);
    // });
 
    // socket.on("latest", (data) => {
    //   addMessage(data);
    //   console.log('latest', data[0]);
    // })
    socket.on('typing', (typing: any) => {
      getValueStorage('user_id').then((user) => {
        if (user === typing.user_id) {
          setTypping('');
        }
        else setTypping(typing)
      });
    });

    return unscribe;
  }, [navigation, getChatById, dispatch]);

  const onHandleTyping = () => {
    getValueStorage('user_id').then((user) => {
      socket.emit('typing', user);
    });
  }
  return (
    <WrapperKeyboard behavior={'padding'} keyboardVerticalOffset={20}>
      <Header
        title={title ? title : 'Loading...'}
        pressL={onHandleBack}
        leftIcon={'chevron-back'}
        rightIcon={'ellipsis-horizontal'}
      />
      <ChatWrapper
      onContentSizeChange={() => flatListRef.current?.scrollToEnd({animated: true})}
      onLayout={() => flatListRef.current?.scrollToEnd({animated: true})}
        showsVerticalScrollIndicator={false}
        ref={flatListRef}
        data={messagesArray}
        keyExtractor={keyExtractor}
        renderItem={({item, index}) => {
          return (
            <UserWrapper>
              <RenderUserMessage
                key={index}
                // removeMessage={id => removeMessagById(id)}
                iconRemove={value => setIconRemove(value)}
                id={item.user_id}
                info={item}
              />
            </UserWrapper>
          );
        }}
      />
     {typing.message && <RemoveText>{typing.message}</RemoveText> }
      <InputWrapper>
        <IconWrapper>
          <IconI
            name={'add-circle-outline'}
            size={22}
            onPress={sendMessageValue}
          />
        </IconWrapper>
        <Input
          height={heightInput}
          onContentSizeChange={event => {
            setHeightInput(event.nativeEvent.contentSize.height);
          }}
          // onChange={() => onHandleTyping}
          multiline
          placeholder={'Press type a message...'}
          value={text}
          onChangeText={value => {
            setText(value);
            onHandleTyping();
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
            onPress={sendMessageValue}
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
