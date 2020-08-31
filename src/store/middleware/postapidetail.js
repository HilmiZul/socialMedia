import axios from "axios";
import * as actions from "../actions";

export const post_api_detail = ({ dispatch, getState }) => (next) => (
  action
) => {
  if (action.type !== actions.apiPostBegan.type) return next(action);
  //if action is a function such as api call then
  next(action); // passing action to next middleware - the reducer

  const { url, data } = action.payload;
  axios
    .post(`${url}`, data)
    .then((res) => {
      dispatch(actions.apiPostSuccess());
      dispatch(actions.apiGetUserBegan({ url: "./user" }));
    })
    .catch((error) => {
      if (error.response.data.general) {
        dispatch(actions.apiPostFailed(error.response.data.general));
      } else {
        dispatch(actions.apiPostFailed(error.response));
      }
    });
};
