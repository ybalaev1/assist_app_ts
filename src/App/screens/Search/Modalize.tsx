import React, {useEffect, useRef} from 'react';
import {Dimensions, TouchableOpacity, Text, Share} from 'react-native';

import {Modalize} from 'react-native-modalize';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/reducers/rootReduser';
import styled from 'styled-components';
import IconIonic from 'react-native-vector-icons/Ionicons';
// import {useNavigation} from '@react-navigation/native';
import {User} from '../../../models/models';

const deviceHeight = Dimensions.get('screen').height;

const TextDefault = styled(Text)`
  color: ${props => props.theme.text};
  padding: 6px 0;
  font-size: 16px;
  text-align: center;
`;

const Switcher = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  padding: 8px;
  border: 0.5px solid ${props => props.theme.darkblue};
  background-color: ${props => props.theme.secondary};
  border-radius: 8px;
  margin: 4px 12px;
`;
const Modal = styled(Modalize)``;
const TouchIcon = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: space-between;
  background-color: ${props => props.theme.white};
  margin: 10px;
  border: 0px solid black;
  border-radius: 6px;
  padding: 12px 12px;
`;
const IconI = styled(IconIonic)`
  color: ${props => (props.color ? props.color : props.theme.text)};
  padding: 4px 0;
`;
type Props = {
  handleClosed: () => void;
  user: User[] | any;
};
const SearchUsrModalize = ({handleClosed, user}: Props) => {
  // const navigation = useNavigation();
  const modalizeRef = useRef<Modalize>(null);
  const {themeMode} = useSelector((state: RootState) => state.themeMode);

  const shareLink = async () => {
    try {
      const result = await Share.share({
        message: `See profile ${user.fullName} in AssistApp`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('shared with activity type of result.activityType');
        } else {
          console.log('shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('dismissed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    modalizeRef.current?.open();
  }, []);
  const renderFooter = () => {
    return (
      <Switcher onPress={() => modalizeRef.current?.close()}>
        <TextDefault>{'Cancel'}</TextDefault>
      </Switcher>
    );
  };
  return (
    <Modal
      ref={modalizeRef}
      scrollViewProps={{scrollEnabled: false}}
      onClosed={handleClosed}
      // eslint-disable-next-line react-native/no-inline-styles
      modalStyle={{
        backgroundColor: themeMode === 'dark' ? '#0B4257' : '#0887cc',
      }}
      modalTopOffset={deviceHeight / 2}>
      <TouchIcon onPress={shareLink}>
        <TextDefault>{'Share profile'}</TextDefault>
        <IconI name={'ios-share-social-outline'} size={22} />
      </TouchIcon>
      <TouchIcon>
        <TextDefault>{'Set bookmark'}</TextDefault>
        <IconI name={'bookmarks-outline'} size={22} />
      </TouchIcon>
      <TouchIcon>
        <TextDefault>{'Complain'}</TextDefault>
        <IconI color={'red'} name={'ios-flame-outline'} size={22} />
      </TouchIcon>
      {renderFooter()}
    </Modal>
  );
};

export {SearchUsrModalize};
