import {activityTypes} from '../../../store/action_types/activityTypes';
import {
  SubscribeSuccess,
  SubscribeRequest,
  SubscribeSuccessPayload,
  SubscribeFailturePayload,
  SubscribeFailture,
} from '../../../store/types/activitiesTypes';

export const subscribeRequest = (
  id: string,
  id_follow: any,
): SubscribeRequest => ({
  type: activityTypes.FOLLOW_REQUEST,
  id: id,
  id_follow: id_follow,
});

export const subscribeSuccess = (
  payload: SubscribeSuccessPayload,
): SubscribeSuccess => ({
  type: activityTypes.FOLLOW_SUCCESS,
  payload,
});

export const subscribeFailture = (
  payload: SubscribeFailturePayload,
): SubscribeFailture => ({
  type: activityTypes.FOLLOW_FAILTURE,
  payload,
});
