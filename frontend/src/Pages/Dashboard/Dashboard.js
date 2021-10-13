import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setDashboardCounts } from "../../store/store";
import { Count } from "../../Components/Count/Count";

export default function Dashboard() {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.profiles.counts || null);
  console.log({usersData})
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
