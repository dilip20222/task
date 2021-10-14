export const RESET = "RESET";

export function resetStore(state = null) {
  return {
    type: RESET,
    state: state || { profile: null, counts: null , alluser: null , pagesdata : null},
  };
}