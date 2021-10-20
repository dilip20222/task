import { types } from "../constant/constant";
import { USER_DATA } from "./AlluserAction";
const defaultProfile = { alluser: null, pageInfo: null, loading: true };

function alluser(state = defaultProfile, action) {
  switch (action.type) {
    case types.GET_ALLUSER:
      return {
        ...state,
        loading: true,
      };
    case types.SET_USERS:
      return {
        ...state,
        alluser: action.users,
        pageInfo: {...state.pageInfo, count: state.pageInfo.count - action.deletedCount}
      };
    case types.USER_DATA:
      return {
        ...state,
        alluser: [...(state.alluser || []), ...action.usersPerPage.users],
        pageInfo: action.usersPerPage.info,
        loading: false,
      };
    default:
      return state;
  }
}

export default alluser;
