import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SearchParamList} from '../RootStackPrams';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/reducers/rootReduser';
import styled from 'styled-components';
import {Dispatch} from 'redux';
import {Loading} from './LoadingComponent';
import {fetchUsersRequest} from '../../../store/actions/usersActions/usersActions';
import {SearchItem} from '../../../Components/Search/searchItem';
import {SearchBar} from './SearchBar';

type searchScreenProp = StackNavigationProp<SearchParamList>;
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
  const navigation = useNavigation<searchScreenProp>();
  const dispatch: Dispatch<any> = useDispatch();

  const {users, pending, error} = useSelector(
    (state: RootState) => state.users,
    shallowEqual,
  );
  const [loading, setLoading] = useState<boolean>(pending);
  const [searchValue, setSearchValue] = useState<string[]>();

  useEffect(() => {
    refreshUsers();
  }, []);
  const refreshUsers = () => {
    setLoading(true);
    dispatch(fetchUsersRequest());
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  };
  const logIn = () => {
    console.log('logIn', users);
  };

  const keyExtractor = (item: any, index: any) => index;
  return (
    <Wrapper>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorText>{'Errors :('}</ErrorText>
      ) : (
        <ItemsFlat
          ListHeaderComponent={<SearchBar />}
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
