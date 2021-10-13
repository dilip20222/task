import { combineReducers } from "redux";
const PROFILE_DATA = "PROFILE_DATA";
const USER_DATA = "USER_DATA";
const DASHBOARD_COUNTS = "DASHBOARD_COUNTS";
const DELETE = "DELETE"
const RESET = "RESET";
const PAGINATION_PAGE = "PAGINATION_PAGE";
const PAGINATION_PAGE_DATA = "PAGINATION_PAGE_DATA"

export function resetStore(state = null) {
  return {
    type: RESET,
    state: state || { profile: null, counts: null , alluser: null , pagesdata : null},
  };
}

export function addprofile(profile) {
  return {
    type: PROFILE_DATA,
    profile,
  };
}

export function users(alluser) {
  return {
    type: USER_DATA,
    alluser,
  };
}
export function setDashboardCounts(counts) {
  return {
    type: DASHBOARD_COUNTS,
    counts,
  }
}

export function SetPagination(pages)
{
  return {
    type: PAGINATION_PAGE,
    pages
  }
}


export function AllPages(pagesdata)
{
  return {
    type: PAGINATION_PAGE_DATA,
    pagesdata
  }
}

const defaultProfile = { profile: null, counts: null , alluser: null , pages: null , pagesdata : null};

function profiles(state = defaultProfile, action)
 {
  console.log("action", { action });
  switch (action.type) {
    case PROFILE_DATA:
      return {
        ...state,
        profile: action.profile,
      };
    case RESET:
      return {
        ...state,
        ...action.state,
      };
    case USER_DATA:
      return {
        ...state,
        alluser: action.alluser,
      };
    case DASHBOARD_COUNTS:
      return {
        ...state,
        counts: action.counts,
      };
      case PAGINATION_PAGE:
        return {
          ...state, 
          pages: action.pages
        }
        case PAGINATION_PAGE_DATA:
          return {
            ...state, 
            pagesdata : action.pagesdata
          }
    default:
      return state;
  }
}

const profileApp = combineReducers({
  profiles,
});

export default profileApp;
