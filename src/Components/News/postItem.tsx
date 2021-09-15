import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';
import {getDateString} from '../../storage/moddleware';
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

const PostItem = (prop: {post: any; pending: boolean}) => {
  const navigation = useNavigation();
  const [fullScreen, setFull] = useState(false);
  // const {user} = prop.post;
  // const dispatch: Dispatch<any> = useDispatch();
  // const {personal, pending} = useSelector(
  //   (state: RootState) => state.personal,
  //   shallowEqual,
  // );
  const images = [
    {
      uri: prop.post.image,
    },
  ];
  // useEffect(() => {
  //   dispatch(fetchPersonalRequest(user));
  // }, [dispatch, user]);

  const WrapperItem = styled(View)`
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
  // const renderBlockUser = () => {
  //   return (
  //     <HeadWrapper>
  //       <UserWrapper onPress={() => console.log(prop.post)}>
  //         <UserImage
  //           source={
  //             personal.image
  //               ? {uri: personal.image}
  //               : require('../../assets/images/person.png')
  //           }
  //         />
  //         <WrapperName>
  //           <UserName>{pending ? 'Loading ...' : personal.fullName}</UserName>
  //           <Timistamp>{getDateString(prop.post.createdAt)}</Timistamp>
  //         </WrapperName>
  //       </UserWrapper>
  //       <IconWrapper>
  //         <IconI name={'move-h-a'} size={22} />
  //       </IconWrapper>
  //     </HeadWrapper>
  //   );
  // };

  return (
    <WrapperItem>
      <ImageView
        imageIndex={0}
        images={images}
        FooterComponent={() => {
          return (
            <MessagePostF>{`${prop.post.message.slice(
              0,
              32,
            )}...`}</MessagePostF>
          );
        }}
        visible={fullScreen}
        onRequestClose={() => setFull(false)}
      />
      {/* {renderBlockUser()} */}
      <MessagePost>
        {prop.post.message.length > 30
          ? `${prop.post.message.slice(0, 32)} ...`
          : prop.post.message}
      </MessagePost>
      {prop.post.image && (
        <ImageTouch activeOpacity={0.7} onPress={() => setFull(true)}>
          <ImagePost source={{uri: prop.post.image}} resizeMode={'contain'} />
        </ImageTouch>
      )}
      <HeadWrapper>
        <WrapperLC
          onPress={() => navigation.navigate('CrntPost', {data: prop.post})}>
          <IconI name={'comment'} size={22} />
          <CommentText>{prop.post.comments.length}</CommentText>
        </WrapperLC>
        <WrapperLC>
          <LikeText>{prop.post.likes.length}</LikeText>
          <IconI name={'angelist'} size={26} />
        </WrapperLC>
      </HeadWrapper>
    </WrapperItem>
  );
};

export {PostItem};
