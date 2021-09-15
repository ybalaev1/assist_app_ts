import {PhoneNumberUtil} from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

export const isValidNumber = (number: string, countryCode: string) => {
  try {
    const parseNumber = phoneUtil.parse(number, countryCode);
    return phoneUtil.isValidNumber(parseNumber);
  } catch (err) {
    return false;
  }
};
