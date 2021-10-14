import { types } from "../constant/constant";
export function resetStore(state = null) {
  return {
    type: types.RESET,
    state: state || { profile: null, counts: null , alluser: null , pagesdata : null},
  };
}