import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Count } from "../../Components/Count/Count";
import { getDashboardCounts } from "../../store/Setcount/Action";

 function Dashboard() {
  const dispatch = useDispatch();
  const userCount = useSelector((state) => state?.Setcount?.counts || 0);

  useEffect(() => {
    if(!userCount)
    {
      dispatch(getDashboardCounts())
    }
  }, []);


  return (
    <>
      <Count title="Users Count" count={userCount} />
    </>
  );
}

export default Dashboard;