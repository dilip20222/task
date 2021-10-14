export const USER_DATA = "USER_DATA";

export function users(alluser) {
  return {
    type: USER_DATA,
    alluser,
  };
}