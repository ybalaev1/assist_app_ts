import React from 'react';
import {TextInput, View} from 'react-native';
import styled from 'styled-components';
import IconIonic from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/reducers/rootReduser';

const Wrapper = styled(View)`
  background-color: ${props => props.theme.blue};
  flex-direction: row;
  border: 0 solid ${props => props.theme.black};
  border-radius: 12px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  margin-bottom: 16px;
  border-bottom-width: 0.5px;
`;
const WrapperInput = styled(TextInput)`
  background-color: ${props => props.theme.blue};
  color: ${props => props.theme.text};
  border: 0 solid ${props => props.theme.black};
  border-bottom-width: 0.5px;
`;
const IconI = styled(IconIonic)`
  color: ${props => props.theme.black};
  padding: 16px;
`;

const SearchBar = () => {
  const {themeMode} = useSelector((state: RootState) => state.themeMode);
  return (
    <Wrapper>
      <IconI name={'search-outline'} size={18} />
      <WrapperInput
        placeholder={'Press type for search users ...'}
        placeholderTextColor={themeMode === 'dark' ? 'white' : '#424242'}
      />
    </Wrapper>
  );
};
export {SearchBar};
