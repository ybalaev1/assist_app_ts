import {registUserTypes} from '../../../store/action_types/usersTypes';

export interface RegistUserSuccessPayload {
  data: any;
}

export interface RegistUserFailturePayload {
  errors: string;
}

export interface RegistUserType {
  type: typeof registUserTypes.REGISTRATION_USER;
}
export type RegistUserSuccess = {
  type: typeof registUserTypes.REGISTRATION_USER_SUCCESS;
  payload: RegistUserSuccessPayload;
};

export type RegistUserFailture = {
  type: typeof registUserTypes.REGISTRATION_USER_FAILTURE;
  payload: RegistUserFailturePayload;
};

export const registUser = (data: any) => {
  return {
    type: registUserTypes.REGISTRATION_USER,
    data,
  };
};

export type RegistActions = RegistUserSuccess | RegistUserFailture;

export const registRequest = (): RegistUserType => ({
  type: registUserTypes.REGISTRATION_USER,
});

export const registUserSuccess = (
  payload: RegistUserSuccessPayload,
): RegistUserSuccess => ({
  type: registUserTypes.REGISTRATION_USER_SUCCESS,
  payload,
});

export const registUserFailture = (
  payload: RegistUserFailturePayload,
): RegistUserFailture => ({
  type: registUserTypes.REGISTRATION_USER_FAILTURE,
  payload,
});
