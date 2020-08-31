import * as actions from "../actions";

const initialState = {
  screams: null,
  loading: false,
  errors: null,
  like_errors: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.apiGetScreamBegan.type:
      console.log("user start fetching scream data");
      return {
        ...state,
        loading: true,
        errors: null,
      };

    case actions.apiGetScreamSuccess.type:
      console.log("data successfully fetched as", action.payload.screams);

      return {
        ...state,
        loading: false,
        screams: action.payload.screams,
      };

    case actions.apiGetScreamFailed.type:
      console.log("apiGetScreamFailed : ", action.payload);
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    case actions.apiLikeScreamBegan.type:
      console.log("user start like a scream");

    case actions.apiUnLikeScreamBegan.type:
      console.log("user start unlike a scream");

    case actions.apiLikeScreamSuccess.type:
    case actions.apiUnLikeScreamSuccess.type:
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      return {
        ...state,
      };

    case actions.apiLikeScreamFailed.type:
    case actions.apiUnLikeScreamFailed.type:
      console.log("apiLikeScreamFailed : ", action.payload);

    default:
      return state;
  }
}
