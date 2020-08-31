import axios from "axios";
import * as actions from "../types";

export const post_image_api = ({ dispatch, getState }) => (next) => (
  action
) => {
  if (action.type !== actions.apiImageBegan.type) return next(action);
  //if action is a function such as api call then
  next(action); // passing action to next middleware - the reducer

  const { image } = action.payload;
  console.log("userData", image);

  axios
    .post(`/user/image`, image)
    .then((res) => {
      dispatch(actions.apiImageSuccess());
      dispatch(actions.apiGetBegan({ url: "./user" }));
    })
    .catch((error) => {
      if (error.response.data.general) {
        dispatch(actions.apiImageFailed(error.response.data.general));
      } else {
        dispatch(actions.apiImageFailed(error.response));
      }
    });
};
