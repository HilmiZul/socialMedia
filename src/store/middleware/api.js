import axios from "axios";
import { setAuthorizationHeader } from "../helper";
import * as actions from "../types";

export const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);
  //if action is a function such as api call then
  next(action); // passing action to next middleware

  const { url, userData, history } = action.payload;

  try {
    const res = await axios.post(`/${url}`, userData);
    setAuthorizationHeader(res.data.token);
    dispatch(actions.apiCallSuccess(res.data));
    history.push("/home");
  } catch (error) {
    dispatch(actions.apiCallSuccess(error.message));
  }
};
