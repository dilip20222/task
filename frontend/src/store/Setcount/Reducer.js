import { types } from "../constant/constant";
const defaultProfile = { counts: null };

function Setcount(state = defaultProfile, action) {
  switch (action.type) {
    case types.GET_DASHBOARD_COUNTS:
    return {
      ...state,
      loading: true,
    }
    case types.DASHBOARD_COUNTS:
      return {
        ...state,
        counts: action.counts,
        loading: false
      };
    default:
      return state;
  }
}

export default Setcount;
