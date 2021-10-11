import React, {useEffect, useRef} from 'react';
import {Dimensions, TouchableOpacity, Text, Switch, View, Share} from 'react-native';

import {Modalize} from 'react-native-modalize';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/reducers/rootReduser';
import {setThemeMod, ThemeModEnum} from '../../../types/theme/themeMod.slice';
import styled from 'styled-components';
import {useAppDispatch} from '../../../types/theme/utils/useAppDispatch';
import IconIonic from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const deviceHeight = Dimensions.get('screen').height;
const {DARK, LIGHT} = ThemeModEnum;

const TextDefault = styled(Text)`
  color: ${props => props.theme.black};
  padding: 6px 0;
  font-size: 16px;
  text-align: center;
`;

const Switcher = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 0;
  border: 0px solid ${props => props.theme.black};
  border-bottom-width: 0.5px;
  margin: 4px 16px;
`;
const Modal = styled(Modalize)`
  background-color: ${props => props.theme.black};
`;
const TouchIcon = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: space-between;
  background-color: ${props => props.theme.white};
  margin: 10px;
  border: 0px solid black;
  border-radius: 6px;
  padding: 4px 8px;
`;
const IconI = styled(IconIonic)`
  color: ${props => props.theme.text};
  padding: 4px 0;
`;
type Props = {
  logout: () => void;
  handleClosed: () => void;
  name: string;
};
const PostModalize = ({logout, handleClosed, name}: Props) => {
  const navigation = useNavigation();
  const modalizeRef = useRef<Modalize>(null);
  const {themeMode} = useSelector((state: RootState) => state.themeMode);
  const dispatch = useAppDispatch();
  const shareLink = async () => {
    try {
      const result = await Share.share({
        message: `See my profile (${name}) in AssistApp`,
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
    modalizeRef.current.open();
  }, []);
  const renderHeader = () => {
    return (
      <Switcher>
        <TextDefault>{'Switch color sheme'}</TextDefault>
        <Switch
          thumbColor={themeMode === 'dark' ? '#fff' : '#0B4257'}
          ios_backgroundColor={themeMode === 'dark' ? '#fff' : '#fff'}
          value={themeMode === DARK}
          onValueChange={value => {
            dispatch(setThemeMod(value ? DARK : LIGHT));
          }}
        />
      </Switcher>
    );
  };
  return (
    <Modal
      ref={modalizeRef}
      onClosed={handleClosed}
      // eslint-disable-next-line react-native/no-inline-styles
      modalStyle={{
        backgroundColor: themeMode === 'dark' ? '#0B4257' : '#0887cc',
      }}
      modalTopOffset={deviceHeight / 3}
      HeaderComponent={renderHeader()}>
      <TouchIcon onPress={() => navigation.navigate('Setting')}>
        <TextDefault>{'Setting`s'}</TextDefault>
        <IconI name={'cog-outline'} size={22} />
      </TouchIcon>
      <TouchIcon onPress={shareLink}>
        <TextDefault>{'Share profile'}</TextDefault>
        <IconI name={'ios-share-social-outline'} size={22} />
      </TouchIcon>
      <TouchIcon onPress={() => navigation.navigate('AppInfo')}>
        <TextDefault>{'App information'}</TextDefault>
        <IconI name={'code-working-outline'} size={22} />
      </TouchIcon>
      <TouchIcon onPress={() => navigation.navigate('FeedBack')}>
        <TextDefault>{'Feedback'}</TextDefault>
        <IconI name={'mail-open-outline'} size={22} />
      </TouchIcon>
      <TouchIcon onPress={logout}>
        <TextDefault>{'Log out'}</TextDefault>
        <IconI name={'exit-outline'} size={22} />
      </TouchIcon>
    </Modal>
  );
};

export {PostModalize};
