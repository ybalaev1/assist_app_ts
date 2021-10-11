import {activityTypes} from '../action_types/activityTypes';

export interface SubscribeSuccessPayload {
  subscribe: any;
}
export interface SubscribeFailturePayload {
  error: any;
}
export interface SubscribeRequest {
  type: typeof activityTypes.FOLLOW_REQUEST;
  id: string;
  id_follow: any;
}
export interface SubscribeSuccess {
  type: typeof activityTypes.FOLLOW_SUCCESS;
  payload: SubscribeSuccessPayload;
}
export interface SubscribeFailture {
  type: typeof activityTypes.FOLLOW_FAILTURE;
  payload: SubscribeFailturePayload;
}

export type SubcribeActions =
  | SubscribeRequest
  | SubscribeSuccess
  | SubscribeFailture;
