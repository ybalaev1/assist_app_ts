import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';
import {getDateString} from '../../storage/middleware';
import styled from 'styled-components';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/reducers/rootReduser';
import IconIonic from 'react-native-vector-icons/Fontisto';
import {TouchableOpacity} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {useEffect} from 'react';
import {Dispatch} from 'redux';
import {fetchPersonalRequest} from '../../store/actions/presonalActions/presonalActions';
import {useNavigation} from '@react-navigation/native';
import { TouchableHighlight } from 'react-native-gesture-handler';

const UserWrapper = styled(TouchableOpacity)`
  flex-direction: row;
`;
const HeadWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;
const WrapperName = styled(View)``;
const UserImage = styled(Image)`
  width: 25px;
  height: 25px;
  border-radius: 24px;
  padding-left: 4px;
`;
const UserName = styled(Text)`
  justify-content: flex-start;
  font-size: 16px;
  padding-left: 14px;
  color: ${props => props.theme.black};
`;
const Timistamp = styled(Text)`
  padding-left: 14px;
  font-size: 10px;
  color: ${props => props.theme.gray};
`;
const MessagePost = styled(Text)`
  padding-top: 12px;
  padding-horizontal: 2px;
  justify-content: center;
  font-size: 18px;
  color: ${props => props.theme.black};
`;

const MessagePostF = styled(Text)`
  padding-bottom: 32px;
  padding-horizontal: 22px;
  justify-content: center;
  font-size: 18px;
  color: ${props => props.theme.black};
`;
const IconI = styled(IconIonic)`
  padding: 10px;
  padding-left: 0;
  padding-top: 16px;
  padding-bottom: 4px;
  color: ${props => props.theme.black};
`;
const WrapperLC = styled(TouchableOpacity)`
  flex-direction: row;
`;
const LikeText = styled(Text)`
  font-size: 20px;
  justify-content: flex-end;
  padding: 10px;
  padding-right: 4px;
  padding-top: 18px;
  padding-bottom: 4px;
  color: ${props => props.theme.black};
`;
const CommentText = styled(Text)`
  font-size: 20px;
  justify-content: flex-end;
  padding: 10px;
  margin-left: -14px;
  padding-top: 14px;
  padding-bottom: 4px;
  color: ${props => props.theme.black};
`;
const ImagePost = styled(Image)`
  align-self: center;
  height: 150px;
  width: 200px;
`;

const ImageTouch = styled(TouchableOpacity)``;
const IconWrapper = styled(TouchableOpacity)`
  margin-top: -16px;
`;
interface Props {
  post: {
    message: string;
    image: string;
    comments: string[];
    likes: string[];
    user: {
      fullName: string;
      image: string;
    };
    createdAt: number;
  };
  pending: boolean;
  openModal: () => void;
}

const PostItem = ({post, pending, openModal}: Props) => {
  const navigation = useNavigation();
  const {message, image, comments, likes, user, createdAt} = post;
  const [fullScreen, setFull] = useState(false);
  const images = [
    {
      uri: image,
    },
  ];
  const WrapperItem = styled(TouchableOpacity)`
    flex: 1;
    padding: 14px 10px;
    background-color: ${props => props.theme.white};
    border: 0px solid black;
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    margin-horizontal: 4px;
    border-radius: 6px;
    margin-bottom: 6px;
  `;
  const renderBlockUser = () => {
    return (
      <HeadWrapper>
        <UserWrapper onPress={() => console.log(post)}>
          <UserImage
            source={
              user.image
                ? {uri: user.image}
                : require('../../assets/images/person.png')
            }
          />
          <WrapperName>
            <UserName>{pending ? 'Loading ...' : user.fullName}</UserName>
            <Timistamp>{getDateString(createdAt)}</Timistamp>
          </WrapperName>
        </UserWrapper>
        <IconWrapper onPress={openModal}>
          <IconI name={'move-h-a'} size={22} />
        </IconWrapper>
      </HeadWrapper>
    );
  };

  return (
    <WrapperItem
    onPress={() => navigation.navigate('CrntPost', {post_id: post})}>
      <ImageView
        imageIndex={0}
        images={images}
        FooterComponent={() => {
          return <MessagePostF>{`${message.slice(0, 32)}...`}</MessagePostF>;
        }}
        visible={fullScreen}
        onRequestClose={() => setFull(false)}
      />
      {renderBlockUser()}
      <MessagePost>
        {message}
        {/* {message.length > 30 ? `${message.slice(0, 32)} ...` : message} */}
      </MessagePost>
      {image && (
        <ImageTouch activeOpacity={0.7} onPress={() => setFull(true)}>
          <ImagePost source={{uri: image}} resizeMode={'contain'} />
        </ImageTouch>
      )}

      <HeadWrapper>
        <WrapperLC
          onPress={() => navigation.navigate('CrntPost', {post_id: post})}>
          <IconI name={'comment'} size={22} />
          <CommentText>{comments}</CommentText>
        </WrapperLC>
        <WrapperLC>
          <LikeText>{likes}</LikeText>
          <IconI name={'angelist'} size={26} />
        </WrapperLC>
      </HeadWrapper>
    </WrapperItem>
  );
};

export {PostItem};
