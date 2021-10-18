import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Header} from '../../../Components/Header/Header';
import {useNavigation} from '@react-navigation/core';
import axios from 'axios';
import {api} from '../../../network/api_request';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchImageLibrary,
  launchCamera,
} from 'react-native-image-picker';

const Wrapper = styled(ScrollView)`
  flex: 1;
  background-color: ${props => props.theme.background};
`;
const InputWrapper = styled(TextInput)`
  padding: 14px;
  color: ${props => props.theme.black};
`;
const AddImageBtn = styled(TouchableOpacity)`
  margin: 14px;
  background-color: ${props => props.theme.darkblue};
  border-radius: 8px;
`;
const TextBtn = styled(Text)`
  color: ${props => props.theme.text};
  text-align: center;
  padding: 8px 0;
`;
const CreatedPost = () => {
  const navigation = useNavigation();
  const [valueMessage, setMessage] = useState('');
  const [response, setResponse] = React.useState<any>(null);

  const handleMessage = (value: string) => {
    setMessage(value);
  };
  const sendNewPost = () => {
    console.log(api.users);
    // axios.post(api.news, {message: valueMessage}).then((result: any) => {
    //   if (result.data.id) {
    //     navigation.goBack();
    //   }
    // });
  };

  const laungImage = useCallback((type, options) => {
    if (type === 'capture') {
      launchCamera(options, setResponse);
    } else {
      launchImageLibrary(options, res => {
        console.log(res);
      });
    }
  }, []);
  return (
    <Wrapper>
      <Header
        title={'Create new post'}
        pressL={navigation.goBack}
        leftIcon={'chevron-back'}
        rightIcon={'checkmark-done'}
        pressR={sendNewPost}
      />
      <InputWrapper
        multiline
        maxLength={1200}
        placeholderTextColor={'#fff'}
        value={valueMessage}
        placeholder={'Press typping message...'}
        onChangeText={value => handleMessage(value)}
      />
      {response?.assets &&
        response?.assets.map(({uri}) => (
          <View key={uri} style={{width: 150, height: 150}}>
            <Image
              resizeMode="cover"
              resizeMethod="scale"
              style={{width: 200, height: 200}}
              source={{uri: uri}}
            />
          </View>
        ))}
      <TextBtn>{JSON.stringify(response, null, 2)}</TextBtn>
      {actions.map(({title, type, options}) => {
        return (
          <AddImageBtn key={title} onPress={() => laungImage(type, options)}>
            <TextBtn>{title}</TextBtn>
          </AddImageBtn>
        );
      })}
    </Wrapper>
  );
};

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: CameraOptions | ImageLibraryOptions;
}

const actions: Action[] = [
  {
    title: 'Take Image',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    },
  },
  {
    title: 'Select Image',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
    },
  },
  {
    title: 'Take Video',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'video',
    },
  },
  {
    title: 'Select Video',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'video',
    },
  },
  {
    title: 'Select Image or Video\n(mixed)',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'mixed',
    },
  },
];
export {CreatedPost};
