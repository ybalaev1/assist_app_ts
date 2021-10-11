import React, {useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import styled from 'styled-components';
import ImageView from 'react-native-image-viewing';

const Wrapper = styled(View)`
  background-color: ${props => props.theme.background};
  align-content: center;
`;

const ImageTouch = styled(TouchableOpacity)``;

const WrapperImage = styled(Image)`
  align-self: center;
  height: 120px;
  width: 120px;
  border-radius: 30px;
  align-self: flex-start;
`;
type Props = {
  image: string;
};
const DefImgUsr = ({image}: Props) => {
  const [fullScreen, setFull] = useState(false);

  return (
    <Wrapper>
      <ImageView
        imageIndex={0}
        images={[
          image ? {uri: image} : require('../../assets/images/person.png'),
        ]}
        visible={fullScreen}
        onRequestClose={() => setFull(false)}
      />
      <ImageTouch activeOpacity={0.7} onPress={() => setFull(true)}>
        <WrapperImage
          source={
            image ? {uri: image} : require('../../assets/images/person.png')
          }
          resizeMode={'cover'}
        />
      </ImageTouch>
    </Wrapper>
  );
};

export {DefImgUsr};
