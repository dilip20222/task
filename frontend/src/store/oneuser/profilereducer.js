import { types } from "../constant/constant";
const defaultProfile = { profile: null , loading : true};


function profiles(state = defaultProfile, action)
 {
  console.log("action", { action });
  switch (action.type) {
    case types.GET_PROFILE:
      return {
        ...state,
      };
    case types.PROFILE_DATA:
      return {
        ...state,
        profile: action.profile,
        loading: false,
      };
    default:
      return state;
  }
}

export default profiles;