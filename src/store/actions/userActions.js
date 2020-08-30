import { apiCallBegan } from "../types";

export const loginUser = (userData, url) => {
  return (dispatch) => dispatch(apiCallBegan({ userData, url }));
};
