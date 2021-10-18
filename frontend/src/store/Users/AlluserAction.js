import { types } from "../constant/constant";

export function alluser()
{
  return {
    type:  types.GET_ALLUSER,
  }
}

export function users(alluser) {
  return {
    type: types.USER_DATA,
    alluser,
  };
}