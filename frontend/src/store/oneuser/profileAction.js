export const PROFILE_DATA = "PROFILE_DATA";

export function addprofile(profile) {
  return {
    type: PROFILE_DATA,
    profile,
  };
}