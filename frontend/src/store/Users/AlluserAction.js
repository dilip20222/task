import { types } from "../constant/constant";
export function users(alluser) {
  return {
    type: types.USER_DATA,
    alluser,
  };
}