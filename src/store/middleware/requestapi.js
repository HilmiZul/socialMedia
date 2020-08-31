import axios from "axios";
import * as actions from "../types";

export const request_api = ({ dispatch }) => (next) => (action) => {
  if (action.type !== actions.apiGetBegan.type) return next(action);

  next(action);

  const { url } = action.payload;

  axios
    .get(`${url}`)
    .then((res) => dispatch(actions.apiGetSuccess(res.data)))
    .catch((error) => {
      console.log("error", error);
      dispatch(actions.apiGetFailed(error));
    });
};
