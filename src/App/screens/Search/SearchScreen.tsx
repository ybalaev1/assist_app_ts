import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, FlatList} from 'react-native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/reducers/rootReduser';
import styled from 'styled-components';
import {Dispatch} from 'redux';
import {Loading} from './LoadingComponent';
import {fetchUsersRequest} from '../../../store/actions/usersActions/usersActions';
import {SearchItem} from '../../../Components/Search/searchItem';
import {SearchBar} from './SearchBar';
import {Header} from '../../../Components/Header/Header';
import {useNavigation} from '@react-navigation/native';

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

const SearchScreen = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const navigation = useNavigation();

  const {users, pending, error} = useSelector(
    (state: RootState) => state.users,
    shallowEqual,
  );

  const [refreshing, setRefreshing] = useState<boolean>(pending);
  const [usersArray, setUsersArray] = useState<any>();

  const refreshUsers = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchUsersRequest());
    setTimeout(() => {
      setRefreshing(false);
      setUsersArray(users);
    }, 200);
  }, [dispatch, setUsersArray, users]);

  const filteredUsers = (newUsers: any) => {
    setUsersArray(newUsers);
  };

  useEffect(() => {
    const unscribe = navigation.addListener('focus', () => {
      refreshUsers;
    });
    return unscribe;
  }, [navigation, refreshUsers]);

  const keyExtractor = (_item: any, index: any) => index;
  return (
    <Wrapper>
      <Header title={'Search'} />
      {refreshing ? (
        <Loading />
      ) : error ? (
        <ErrorText>{'Not load data :('}</ErrorText>
      ) : (
        <ItemsFlat
          onRefresh={refreshUsers}
          refreshing={refreshing}
          ListHeaderComponent={
            <SearchBar
              users={users}
              initialUsers={refreshUsers}
              filtered={data => filteredUsers(data)}
            />
          }
          showsVerticalScrollIndicator={false}
          data={users}
          keyExtractor={keyExtractor}
          renderItem={({item, index}) => <SearchItem user={item} key={index} />}
        />
      )}
      <WrapperBottom />
    </Wrapper>
  );
};

export default SearchScreen;
