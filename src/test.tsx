/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {React$Node} from 'src/types/AppTypes';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {RootState} from 'src/store/reducers/rootReduser';
import {fetchUsersRequest} from '../src/store/actions/usersActions/usersActions';
import {Dispatch} from 'redux';

const App: () => React$Node = () => {
  const dispatch: Dispatch<any> = useDispatch();
  // const users: User[] = useSelector(
  //   (state: RootState) => state.users
  // );
  const {pending, error, users} = useSelector(
    (state: RootState) => state.users,
    shallowEqual,
  );
  const [usersMap, setUsers] = useState([]);
  useEffect(() => {
    dispatch(fetchUsersRequest());
    setUsers(users);
  }, [dispatch, users]);

  const fetch = () => {
    dispatch(fetchUsersRequest());
    setUsers(users);
    console.log('data', users);
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={{flex: 1}}>
        {pending ? (
          <Text>{'Loading ...'}</Text>
        ) : error ? (
          <Text>{'error'}</Text>
        ) : (
          usersMap &&
          usersMap.map((user: any, i) => {
            return <Text key={i}>{user.fullName}</Text>;
          })
        )}
        <TouchableOpacity onPress={() => fetch()}>
          <Text>{'fetch'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default App;
