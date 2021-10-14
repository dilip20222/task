import { types } from "../constant/constant";

export function getuserprofile() {
  return {
    type: types.GET_PROFILE 
  }
}

export function addprofile(profile) {
  return {
    type:types.PROFILE_DATA,
    profile,
  };
}