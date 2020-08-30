import { apiCallSuccess, apiCallFailed, apiCallBegan } from "../types";
import { setAuthorizationHeader } from "../helper";

const initialState = {
  authenticated: false,
  loading: false,
  errors: null,
  token: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case apiCallBegan.type:
      console.log("user submit login form");
      return {
        ...state,
        loading: true,
        errors: null,
      };

    case apiCallSuccess.type:
      console.log("login successfully setting token as", action.payload);
      setAuthorizationHeader(action.payload);
      return {
        ...state,
        loading: false,
        authenticated: true,
      };
    case apiCallFailed.type:
      console.log("login failed : ", action.payload);
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    default:
      return state;
  }
}
