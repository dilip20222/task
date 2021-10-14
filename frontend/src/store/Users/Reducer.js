import { types } from "../constant/constant";
import { USER_DATA } from "./AlluserAction";
const defaultProfile = { alluser: null };

function alluser(state = defaultProfile, action) {

  switch (action.type) {
    case types.USER_DATA:
      return {
        ...state,
        alluser: action.alluser,
      };
    default:
      return state;
  }
}

export default alluser;
