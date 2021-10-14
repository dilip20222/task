import { USER_DATA } from "./AlluserAction";
const defaultProfile = { alluser: null };

function alluser(state = defaultProfile, action) {

  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        alluser: action.alluser,
      };
    default:
      return state;
  }
}

export default alluser;
