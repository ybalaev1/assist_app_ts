import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/reducers/rootReduser';
import {fecthPostRequest} from '../../../store/actions/postActions/postActions';
import {PostItem} from '../../../Components/News/postItem';
import styled from 'styled-components';
import {Dispatch} from 'redux';
import {Loading} from './LoadingComponent';
import {Header} from '../../../Components/Header/Header';

const Wrapper = styled(View)`
  flex: 1;
  background-color: ${props => props.theme.background};
  align-content: center;
`;
const ItemsFlat = styled(FlatList)`
  flex: 1;
  padding-bottom: 120px;
`;

const ErrorText = styled(Text)`
  text-align: center;
  font-size: 22px;
  color: ${props => props.theme.text};
`;
const WrapperBottom = styled(View)`
  margin-top: 44px;
`;

const NewsScreen = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const {pending, posts, error} = useSelector(
    (state: RootState) => state.posts,
    shallowEqual,
  );
  const [loading, setLoading] = useState<boolean>(pending);

  useEffect(() => {
    refreshNews();
  }, []);
  const refreshNews = () => {
    setLoading(true);
    dispatch(fecthPostRequest());

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  const logIn = () => {
    console.log('logIn');
  };

  const keyExtractor = (item: any, index: any) => index;
  return (
    <Wrapper>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorText>{'No new posts'}</ErrorText>
      ) : (
        <ItemsFlat
          // eslint-disable-next-line react-native/no-inline-styles
          ListHeaderComponentStyle={{marginBottom: 30}}
          ListHeaderComponent={
            <Header
              pressL={logIn}
              pressR={refreshNews}
              title={'News'}
              leftIcon={'add-outline'}
              rightIcon={'notifications-outline'}
            />
          }
          showsVerticalScrollIndicator={false}
          data={posts}
          keyExtractor={keyExtractor}
          renderItem={({item, index}) => <PostItem post={item} key={index} />}
        />
      )}
      <WrapperBottom />
    </Wrapper>
  );
};

export default NewsScreen;
