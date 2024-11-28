import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatistics } from "@/utils/taskSlice";

const DashBoard = () => {
  const dispatch = useDispatch();
  const { statistics } = useSelector((store) => store.tasks);

  useEffect(() => {
    dispatch(fetchStatistics());
  }, []);

  if (!statistics) return;
  return (
    <div className="p-10">
      <div>
        <h1 className="text-4xl text-center">Unlocking Insights</h1>
      </div>
      <h1 className="text-3xl font-bold my-5">Dashboard</h1>
      <section className="pt-4 w-1/2 my-10">
        <h2 className="text-2xl font-bold mb-4 ">Summary</h2>
        <div className="flex flex-wrap justify-between space-x-4">
          <section className="text-center text-[#0055CC] flex-1">
            <h3 className="text-3xl font-bold">{statistics.totalTasks}</h3>
            <p className="text-lg">Total Tasks</p>
          </section>
          <section className="text-center text-[#0055CC] flex-1">
            <h3 className="text-3xl font-bold">
              {statistics.completedPercentage.toFixed(2)}%
            </h3>
            <p className="text-lg">Tasks Completed</p>
          </section>
          <section className="text-center text-[#0055CC] flex-1">
            <h3 className="text-3xl font-bold">
              {statistics.pendingPercentage.toFixed(2)}%
            </h3>
            <p className="text-lg">Tasks Pending</p>
          </section>
          <section className="text-center text-[#0055CC] flex-1">
            <h3 className="text-3xl font-bold">
              {Math.round(statistics.avgCompletionTime)} hrs
            </h3>
            <p className="text-lg">Average time per completed task</p>
          </section>
        </div>
      </section>
    </div>
  );
};

export default DashBoard;
