export const DASHBOARD_COUNTS = "DASHBOARD_COUNTS";

export function setDashboardCounts(counts) {
  return {
    type: DASHBOARD_COUNTS,
    counts,
  }
}