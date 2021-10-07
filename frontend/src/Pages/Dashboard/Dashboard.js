import * as React from "react";
import { Count } from "../../Components/Count";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDashboardCounts } from "../../store/store";

export default function Dashboard() {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.profiles.counts || null);

  useEffect(() => {
     if(!usersData) {  
      axios.get("http://localhost:3000/api/count").then((res) => {
        dispatch(setDashboardCounts(res.data));
      });
     }  
  }, []);

  return (
    <>
      <Count title="Users Count" count={usersData} />
    </>
  );
}
