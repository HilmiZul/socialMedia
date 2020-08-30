import { apiCallSuccess, apiCallFailed } from "../types";

const initialState = {
  authenticated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case apiCallSuccess.type:
      return {
        ...state,
        authenticated: true,
      };
    case apiCallFailed.type:
      return {
        ...state,
        authenticated: false,
      };
    default:
      return state;
  }
}
