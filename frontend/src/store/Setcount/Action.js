import { types } from "../constant/constant"

export function getDashboardCounts() {
  return {
    type: types.GET_DASHBOARD_COUNTS
  }
}

export function setDashboardCounts(counts) {
  return {
    type:types.DASHBOARD_COUNTS,
    counts,
  }
}