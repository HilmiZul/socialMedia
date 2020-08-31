import * as actions from "../types";
import { setAuthorizationHeader, removeAuthorizationHeader } from "../helper";

const initialState = {
  authenticated: false,
  loading: false,
  errors: null,
  fetch_loading: false,
  fetch_errors: null,
  fetchedData: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.apiCallBegan.type:
      console.log("user submit login form");
      return {
        ...state,
        loading: true,
        errors: null,
      };

    case actions.apiGetBegan.type:
      console.log("user start fetching data");
      return {
        ...state,
        fetch_loading: true,
        fetch_errors: null,
        fetchedData: null,
      };

    case actions.apiCallSuccess.type:
      console.log("login successfully setting token as", action.payload);
      setAuthorizationHeader(action.payload);
      return {
        ...state,
        loading: false,
        authenticated: true,
      };

    case actions.apiGetSuccess.type:
      console.log("data successfully fetched as", action.payload);

      return {
        ...state,
        fetch_loading: false,
        fetchedData: action.payload,
      };

    case actions.apiCallFailed.type:
      console.log("login failed : ", action.payload);
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    case actions.apiGetFailed.type:
      console.log("login failed : ", action.payload);
      return {
        ...state,
        fetch_loading: false,
        fetch_errors: action.payload,
      };

    case actions.logoutUser.type:
      console.log("logging out user");
      removeAuthorizationHeader();
      return {
        ...state,
        authenticated: false,
      };

    case actions.apiUserInfo.type:
      return state.fetchedData;

    default:
      return state;
  }
}
