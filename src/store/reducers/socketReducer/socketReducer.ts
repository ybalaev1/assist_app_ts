import { CONNECTION_CHANGED } from "../../../store/actions/socketActions/socketActions";

const INITIAL_STATE = {
  connected: false,
  port: '8999'
};

function socketReducer(state = INITIAL_STATE, action: { type: string, port: string, connected: boolean }) {
  let reduced;
  switch (action.type) {
    case CONNECTION_CHANGED:
      reduced = Object.assign({}, state, {
        connected: action.connected,
        isError: false
      });
      break;
    default:
      reduced = state;
  }
  return reduced;
}

export default socketReducer;