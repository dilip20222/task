import { DASHBOARD_COUNTS } from "./Action";
const defaultProfile = { counts: null};

function Setcount(state = defaultProfile, action)
 {
  switch (action.type) {
    case DASHBOARD_COUNTS:
      return {
        ...state,
        counts: action.counts,
      };
    default:
      return state;
  }
}

export default Setcount;