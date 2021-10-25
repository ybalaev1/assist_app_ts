import React, {useState} from 'react';
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
  color: ${props => props.theme.text};
`;
const IconI = styled(IconIonic)`
  color: ${props => props.theme.black};
  padding: 16px;
`;
interface Props {
  users?: any;
  filtered: (data: string[]) => void;
  initialUsers: () => void;
}

const SearchBar = ({users, filtered, initialUsers}: Props) => {
  const {themeMode} = useSelector((state: RootState) => state.themeMode);
  const [searchValue, setSearchValue] = useState<string>('');
  const getFiltered = (value: string) => {
    setSearchValue(value);
    const f = users.filter((s: any) => {
      return s.fullName.startsWith(searchValue);
    });
    filtered(f);
  };

  return (
    <Wrapper>
      <IconI name={'search-outline'} size={18} />
      <WrapperInput
        editable={false}
        value={searchValue}
        onKeyPress={ev => {
          if (
            ev.nativeEvent.key === 'Backspace' &&
            searchValue.length <= 2 &&
            searchValue.length > 0
          ) {
            initialUsers();
          }
        }}
        onChange={value => getFiltered(value.nativeEvent.text)}
        placeholder={'Press type for search users ...'}
        placeholderTextColor={themeMode === 'dark' ? 'white' : '#424242'}
      />
    </Wrapper>
  );
};
export {SearchBar};
