import AsyncStorage from '@react-native-async-storage/async-storage';
import {localStorageType} from 'src/types/AppTypes';

const setValueStorage = async <
  keyType extends keyof localStorageType,
  valueType extends localStorageType[keyType],
>(
  key: keyType,
  value: valueType,
) => {
  return await AsyncStorage.setItem(
    key,
    typeof value !== 'string' ? JSON.stringify(value) : value,
  );
};

const getValueStorage = async <keyType extends keyof localStorageType>(
  key: keyType,
) => {
  const value = await AsyncStorage.getItem(key);
  if (value !== null) {
    return value;
  }
  return;
};

async function removeItem<keyType extends keyof localStorageType>(
  key: keyType,
) {
  await AsyncStorage.multiRemove(['user_id', 'tokenAuth', 'header_auth']);
  await AsyncStorage.removeItem(key);
}

export {setValueStorage, getValueStorage, removeItem};
