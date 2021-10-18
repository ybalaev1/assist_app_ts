import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import {Header} from '../../../Components/Header/Header';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import ImageView from 'react-native-image-viewing';
import {Dispatch} from 'redux';
import {useDispatch} from 'react-redux';
import {fetchPostByIdRequest} from '../../../store/actions/postByIdActions/postByIdActions';
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const Wrapper = styled(View)`
  flex: 1;
  background-color: ${props => props.theme.background};
`;
const PostTitle = styled(Text)`
  color: ${props => props.theme.text};
  font-size: 18px;
  padding: 14px;
`;
type Props = {
  route: any;
};
const ImagePost = styled(Image)`
  align-self: center;
  height: ${screenHeight / 3}px;
  width: ${screenWidth / 2}px;
`;

const ImageTouch = styled(TouchableOpacity)`
  border-bottom-width: 0.5px;
  border: 0px solid ${props => props.theme.darkblue};
  margin-horizontal: 4px;
`;
const CrntPost = ({route}: Props) => {
  const {post_id} = route.params;
  const navigation = useNavigation();
  const [fullScreen, setFull] = useState(false);
  const dispatch: Dispatch<any> = useDispatch();
  const getData = useCallback(() => {
    dispatch(fetchPostByIdRequest(post_id._id));
  }, [post_id._id, dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <Wrapper>
      {post_id && post_id.image && (
        <ImageView
          imageIndex={0}
          images={[{uri: post_id.image}]}
          visible={fullScreen}
          onRequestClose={() => setFull(false)}
        />
      )}
      <Header
        title={`${post_id.user.fullName} posted`}
        pressL={navigation.goBack}
        pressR={navigation.goBack}
        leftIcon={'chevron-back'}
        rightIcon={'ellipsis-horizontal'}
      />
      {post_id && post_id.image && (
        <ImageTouch activeOpacity={0.9} onPress={() => setFull(true)}>
          <ImagePost source={{uri: post_id.image}} resizeMode={'center'} />
        </ImageTouch>
      )}
      {post_id && post_id.message && <PostTitle>{post_id.message}</PostTitle>}
    </Wrapper>
  );
};

export {CrntPost};
