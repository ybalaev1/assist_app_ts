import React from 'react';
import {Image, Text, View} from 'react-native';
import styled from 'styled-components';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SearchParamList} from '../../App/screens/RootStackPrams';
type searchScreenProp = StackNavigationProp<SearchParamList>;

const UserWrapper = styled(View)`
  flex-direction: row;
`;
const HeadWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;
const WrapperName = styled(View)`
  justify-content: center;
`;
const UserImage = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 24px;
`;
const UserName = styled(Text)`
  justify-content: flex-start;
  font-size: 18px;
  padding-left: 14px;
  color: ${props => props.theme.black};
`;

const SearchItem = (prop: {user: any}) => {
  const navigation = useNavigation<searchScreenProp>();
  const WrapperItem = styled(TouchableOpacity)`
    flex: 1;
    padding: 14px 10px;
    background-color: ${props => props.theme.white};
    border: 0px solid black;
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    margin-horizontal: 6px;
    border-radius: 6px;
    margin-bottom: 6px;
  `;
  const getUser = () => {
    navigation.navigate('SearchUser', {id: prop.user});
  };
  return (
    <WrapperItem onPress={() => getUser()}>
      <HeadWrapper>
        <UserWrapper>
          <UserImage
            source={
              prop.user.image
                ? {uri: prop.user.image}
                : require('../../assets/images/person.png')
            }
          />
          <WrapperName>
            <UserName>{prop.user.fullName}</UserName>
          </WrapperName>
        </UserWrapper>
      </HeadWrapper>
    </WrapperItem>
  );
};

export {SearchItem};
