import { types } from "../constant/constant";

export function alluser(data)
{
  return {
    type:  types.GET_ALLUSER,
    data
  }
}

export function setUsers(users, deletedCount) {
  return {
    type: types.SET_USERS,
    users,
    deletedCount
  };
}

export function addUsers(usersPerPage) {
  return {
    type: types.USER_DATA,
    usersPerPage,
  };
}