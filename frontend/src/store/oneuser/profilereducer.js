import { PROFILE_DATA } from "./profileAction";
const defaultProfile = { profile: null};

function profiles(state = defaultProfile, action)
 {

  console.log("sagggggggggaaaaaa" , action)
  console.log("action", { action });
  switch (action.type) {
    case PROFILE_DATA:
      return {
        ...state,
        profile: action.profile,
      };
    default:
      return state;
  }
}

export default profiles;