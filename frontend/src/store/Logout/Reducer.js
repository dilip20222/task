import { RESET } from "./Action";
const defaultProfile = { profile: null, counts: null , alluser: null , pages: null , pagesdata : null};

function reset(state = defaultProfile, action)
 {
  console.log("action", { action });
  switch (action.type) {
    case RESET:
      return {
        ...state,
        ...action.state,
      };
    default:
      return state;
  }
}

export default reset;