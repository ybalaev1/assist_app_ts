import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {OnboardingStackParamList} from '../RootStackPrams';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch} from 'redux';
import {registUser} from '../../../store/actions/authActions/registActions';
import styled from 'styled-components';
import {getThemeMod} from '../../../types/theme/selectors/getThemeMode';
import {ThemeModEnum} from '../../../types/theme/themeMod.slice';
import {isValidNumber} from '../../../storage/validNumber';
import {ModalWindowCheck} from '../../../Components/Modals/ModalResponseTrue';
import {authUser} from '../../../store/actions/authActions/authActions';

type regScreenProp = StackNavigationProp<
  OnboardingStackParamList,
  'Registration'
>;
const {DARK} = ThemeModEnum;
const errorValueType = '';
interface errorsType {
  nameError: string;
  passwordError: string;
  emailError: string;
  numberError: string;
}
var regExpEmail = new RegExp(
  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
);
const WrapperKeyboard = styled(KeyboardAvoidingView)`
  flex: 1;
  padding: 30px 0;
  background-color: ${props => props.theme.background};
  align-content: center;
  justify-content: space-around;
`;
const ImageComponent = styled(Image)`
  width: 200px;
  height: 200px;
  align-self: center;
`;
const InputComponent = styled(TextInput)`
  border: 0.5px solid ${props => props.theme.secondary};
  color: ${props => props.theme.text};
  border-radius: 10px;
  margin: 10px 10px;
  padding: 14px 10px;
`;
const TextError = styled(Text)`
  color: ${props => props.theme.red};
  font-size: 12px;
  text-align: center;
  margin-bottom: -10px;
  font-weight: bold;
`;
const Button = styled(TouchableOpacity)`
  background-color: ${props => props.theme.blue};
  border: 0 ${props => props.theme.secondary};
  border-radius: 12px;
  margin: 0 10px;
`;
const TextDef = styled(Text)`
  color: ${props => props.theme.darkblue};
  font-size: 18px;
  padding: 16px 10px;
  text-align: center;
`;
const TextLine = styled(Text)`
  color: ${props => props.theme.blue};
  font-size: 36px;
  padding: 6px 0;
  text-align: center;
`;
const InputWrapper = styled(View)``;
const RegistrationScreen = () => {
  const navigation = useNavigation<regScreenProp>();
  const dispatch: Dispatch<any> = useDispatch();
  const {themeMode} = useSelector(getThemeMod);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [check, setCheck] = useState<boolean>(false);
  const [errorsValue, setErrors] = useState<errorsType>({
    nameError: errorValueType,
    passwordError: errorValueType,
    emailError: errorValueType,
    numberError: errorValueType,
  });

  const createUser = () => {
    const dataUser = {
      email: email,
      password: password,
      fullName: name,
      mobile_phone: number,
    };
    dispatch(registUser(dataUser));
    setCheck(true);
    setTimeout(() => {
      const authD = {
        email: email,
        password: password,
      };
      dispatch(authUser(authD));
      setCheck(false);
      navigation.navigate('Main');
    }, 3000);
  };
  const inputValue = (value: string, typeV: string) => {
    if (typeV === 'email') {
      if (value.length > 2) {
        if (!regExpEmail.test(value)) {
          setErrors({
            emailError: 'please enter your full email',
            nameError: '',
            passwordError: '',
            numberError: '',
          });
        }
      }
      setEmail(value.toLocaleLowerCase());
    }
    if (typeV === 'name') {
      if (value.length <= 2) {
        setErrors({
          nameError: 'please enter your full name',
          emailError: '',
          passwordError: '',
          numberError: '',
        });
      }
      setName(value);
    }

    if (typeV === 'number') {
      if (isValidNumber(value, 'ru').valueOf()) {
        setNumber(value);
      } else {
        setErrors({
          numberError: 'please enter valid number phone',
          emailError: '',
          passwordError: '',
          nameError: '',
        });
      }
    }
    if (typeV === 'password') {
      if (value.length <= 5) {
        setErrors({
          passwordError: 'please enter long password',
          nameError: '',
          emailError: '',
          numberError: '',
        });
      }
      setPassword(value);
    }
  };
  return (
    <WrapperKeyboard behavior={'padding'}>
      <ImageComponent source={require('../../../assets/images/logo.png')} />
      <TextLine>{'Let`s get started?'}</TextLine>
      <InputWrapper>
        <TextError>{errorsValue.nameError}</TextError>
        <InputComponent
          onChangeText={(value: string) => inputValue(value, 'name')}
          placeholder={'Press enter your name'}
          placeholderTextColor={themeMode === DARK ? 'white' : 'black'}
        />
        <TextError>{errorsValue.emailError}</TextError>
        <InputComponent
          value={email.toLowerCase()}
          onChangeText={(value: string) => inputValue(value, 'email')}
          placeholder={'Press enter your email'}
          placeholderTextColor={themeMode === DARK ? 'white' : 'black'}
          keyboardType={'email-address'}
        />
        <TextError>{errorsValue.passwordError}</TextError>

        <InputComponent
          onChangeText={(value: string) => inputValue(value, 'password')}
          placeholder={'Press enter your password'}
          placeholderTextColor={themeMode === DARK ? 'white' : 'black'}
        />
        <TextError>{errorsValue.numberError}</TextError>
        <InputComponent
          onChangeText={(value: string) => inputValue(value, 'number')}
          placeholder={'Press enter your number'}
          placeholderTextColor={themeMode === DARK ? 'white' : 'black'}
          keyboardType={'phone-pad'}
        />
      </InputWrapper>

      <Button onPress={() => createUser()}>
        <TextDef>{'Create account'}</TextDef>
      </Button>

      <Button onPress={() => navigation.navigate('Auth')}>
        <TextDef>{'Log in'}</TextDef>
      </Button>
      {check && (
        <ModalWindowCheck onHide={() => setCheck(h => !h)} show={check} />
      )}
    </WrapperKeyboard>
  );
};

export default RegistrationScreen;
