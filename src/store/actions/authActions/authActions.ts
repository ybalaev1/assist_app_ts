import {authUserTypes} from '../../../store/action_types/usersTypes';

export interface AuthUserSuccessPayload {
  data_auth: any;
  auth_access: boolean;
}

export interface AuthUserFailturePayload {
  error: string;
  auth_access: boolean;
}

export interface AuthUserType {
  type: typeof authUserTypes.AUTH_USER;
}
export type AuthUserSuccess = {
  type: typeof authUserTypes.AUTH_USER_SUCCESS;
  payload: AuthUserSuccessPayload;
};

export type AuthUserFailture = {
  type: typeof authUserTypes.AUTH_USER_FAILTURE;
  payload: AuthUserFailturePayload;
};

export const authUser = (data_auth: any) => {
  return {
    type: authUserTypes.AUTH_USER,
    data_auth,
  };
};

export type AuthActions = AuthUserSuccess | AuthUserFailture;

export const authRequest = (): AuthUserType => ({
  type: authUserTypes.AUTH_USER,
});

export const authUserSuccess = (
  payload: AuthUserSuccessPayload,
): AuthUserSuccess => ({
  type: authUserTypes.AUTH_USER_SUCCESS,
  payload,
});

export const authUserFailture = (
  payload: AuthUserFailturePayload,
): AuthUserFailture => ({
  type: authUserTypes.AUTH_USER_FAILTURE,
  payload,
});
