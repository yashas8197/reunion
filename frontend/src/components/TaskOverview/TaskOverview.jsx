import React from "react";

const TaskOverview = ({ statistics }) => {
  return (
    <section className="pt-4 my-10">
      <h2 className="text-2xl font-bold mb-4">Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <section className="text-center text-[#569EFC]">
          <h3 className="text-3xl font-bold">{statistics.totalTasks}</h3>
          <p className="text-lg">Total Tasks</p>
        </section>
        <section className="text-center text-[#569EFC]">
          <h3 className="text-3xl font-bold">
            {statistics.completedPercentage.toFixed(2)}%
          </h3>
          <p className="text-lg">Tasks Completed</p>
        </section>
        <section className="text-center text-[#569EFC]">
          <h3 className="text-3xl font-bold">
            {statistics.pendingPercentage.toFixed(2)}%
          </h3>
          <p className="text-lg">Tasks Pending</p>
        </section>
        <section className="text-center text-[#569EFC]">
          <h3 className="text-3xl font-bold">
            {Math.round(statistics.avgCompletionTime)} hrs
          </h3>
          <p className="text-lg">Average time per completed task</p>
        </section>
      </div>
    </section>
  );
};

export default TaskOverview;
