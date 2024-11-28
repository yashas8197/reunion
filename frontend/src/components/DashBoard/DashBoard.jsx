import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatistics } from "@/utils/taskSlice";
import { ChartComponent } from "../PieChart/PieChart";
import TaskOverview from "../TaskOverview/TaskOverview";

const DashBoard = () => {
  const dispatch = useDispatch();
  const { statistics, status } = useSelector((store) => store.tasks);

  useEffect(() => {
    dispatch(fetchStatistics());
  }, []);

  if (status === "loading") {
    return <p className="flex justify-center items-center mt-40">Loading...</p>;
  }

  if (!statistics) return;
  return (
    <div className="p-10">
      <div>
        <h1 className="text-4xl text-center">Unlocking Insights</h1>
      </div>
      <h1 className="text-3xl font-bold my-5">Dashboard</h1>
      <TaskOverview statistics={statistics} />
      <ChartComponent
        totalTasks={statistics.totalTasks}
        completedPercentage={statistics.completedPercentage}
        pendingPercentage={statistics.pendingPercentage}
      />
    </div>
  );
};

export default DashBoard;
