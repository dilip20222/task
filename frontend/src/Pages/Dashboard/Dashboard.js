import * as React from "react";
import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { getDashboardCounts } from "../../store/Setcount/Action";
import { Count } from "../../Components/Count/Count";

export default function Dashboard() {
  const dispatch = useDispatch();
  const userCount = useSelector((state) => state?.Setcount?.counts || 0);

  useEffect(() => {
    dispatch(getDashboardCounts())
  }, []);

  return (
    <>
      <Count title="Users Count" count={userCount} />
    </>
  );
}
