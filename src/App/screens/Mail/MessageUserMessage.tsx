import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Text, View, TouchableOpacity} from 'react-native';
import {getValueStorage} from '../../../storage/storage';
import {getTime} from '../../../storage/middleware';
import IconIonic from 'react-native-vector-icons/Ionicons';

const Wrapper = styled(TouchableOpacity)`
  align-self: ${props => (props.current ? 'flex-end' : 'flex-start')};
  background-color: ${props =>
    props.current ? props.theme.darkblue : props.theme.secondary};
  border: 0 solid black;
  border-radius: 14px;
  border-bottom-left-radius: ${props => (props.current ? '14px' : '4px')};
  border-top-right-radius: ${props => (props.current ? '14px' : '6px')};
  border-top-left-radius: ${props => (props.current ? '4px' : '14px')};
  border-bottom-right-radius: ${props => (props.current ? '4px' : '14px')};
  margin-left: ${props => (props.current ? '20px' : '14px')};
  margin-right: 14px;
  margin-top: 6px;
`;
const Message = styled(Text)`
  font-size: 16px;
  color: ${props => props.theme.text};
  padding: 12px;
  padding-left: 14px;
`;

const MessageTime = styled(Text)`
  font-size: 10px;
  color: ${props => props.theme.lightgray};
  font-style: italic;
  padding-right: 10px;
  padding-bottom: 4px;
`;
const MessageWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-around;
`;

const TimestsampWrapper = styled(View)`
  justify-content: flex-end;
`;
const IconLeft = styled(IconIonic)`
  color: ${props => props.theme.black};
  position: absolute;
  left: -24px;
`;
const IconRight = styled(IconIonic)`
  color: ${props => props.theme.black};
  position: absolute;
  right: -24px;
`;

type Props = {
  id: string;
  info: any;
  removeMessage: (id: string) => void;
  iconRemove: (value: boolean) => void;
};
const RenderUserMessage = ({id, info, removeMessage, iconRemove}: Props) => {
  const [me, setMe] = useState(false);
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    getValueStorage('user_id').then(user_id => {
      if (user_id === id) {
        setMe(true);
      }
    });
  }, [id]);
  const handleRemove = (id_m: string) => {
    // Alert.alert('Remove message?', '', [
    //   {
    //     text: 'Cancel',
    //     onPress: () => console.log('Cancel Pressed'),
    //     style: 'cancel',
    //   },
    //   {text: 'OK', onPress: () => removeMessage(info._id)},
    // ]);
    setSelected(s => !s);
    iconRemove(!selected);
  };
  return (
    <Wrapper current={me} onPress={() => handleRemove(info._id)}>
      <MessageWrapper>
        <Message>{info.message}</Message>
        <TimestsampWrapper>
          <MessageTime>{getTime(Date.parse(info.createdAt))}</MessageTime>
        </TimestsampWrapper>
      </MessageWrapper>
      {selected &&
        (me ? (
          <IconLeft name={'checkmark-circle-outline'} size={22} />
        ) : (
          <IconRight name={'checkmark-circle-outline'} size={22} />
        ))}
    </Wrapper>
  );
};
export {RenderUserMessage};
