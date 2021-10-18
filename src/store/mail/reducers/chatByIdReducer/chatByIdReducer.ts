import {chatByIdTypes} from '../../action/action_mail_types';
import {ChatByIdActions} from '../../types/mailTypes';

const initialState = {
  loading: false,
  chat_id: [],
  errors: null,
};

export default (state = initialState, action: ChatByIdActions) => {
  switch (action.type) {
    case chatByIdTypes.CHAT_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case chatByIdTypes.CHAT_BY_ID_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        chat_id: action.payload.chat_id,
        errors: null,
      };
    case chatByIdTypes.CHAT_BY_ID_REQUEST_FAILTURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors,
      };
    default:
      return {
        ...state,
      };
  }
};
