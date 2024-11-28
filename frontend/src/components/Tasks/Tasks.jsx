import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddTask from "../AddTask/AddTask";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, fetchTasks } from "@/utils/taskSlice";
import TaskTable from "../TaskTable/TaskTable";

const Tasks = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const dispatch = useDispatch();
  const tasks = useSelector((store) => store.tasks?.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);
  if (!tasks) return;

  const handleSelectRecords = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedRows((prev) => [...prev, value]);
    } else {
      setSelectedRows((prev) => prev.filter((row) => row !== value));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedRows.length > 0) {
      selectedRows.forEach((row) => dispatch(deleteTask(row)));
    }
  };

  const sortedTasks = [...tasks]
    .filter((task) => {
      if (filterPriority) {
        return task.priority === parseInt(filterPriority);
      }
      if (filterStatus) {
        return task.status === filterStatus;
      }
      return true;
    })
    .sort((a, b) => {
      const sortByDate =
        sortOrder === "start"
          ? new Date(a.startTime) - new Date(b.startTime)
          : sortOrder === "end"
          ? new Date(a.endTime) - new Date(b.endTime)
          : 0;

      return sortByDate;
    });

  const handleClearFilters = () => {
    setSortOrder("");
    setFilterPriority("");
    setFilterStatus("");
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Task List</h1>

      <div className="flex flex-wrap justify-between items-center space-y-4 sm:space-y-0 sm:flex-nowrap">
        <div className="flex items-center space-x-3">
          <AddTask
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
          <Button
            onClick={handleDeleteSelected}
            className="text-[#cc3a00] mx-3"
            variant="outline"
          >
            Delete Selected
          </Button>
        </div>

        <div className="space-x-3 flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-[#569EFC] text-white p-3 rounded-2xl">
              {sortOrder === "" ? "Sort" : sortOrder}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortOrder("start")}>
                Sort by Start Time
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOrder("end")}>
                Sort by End Time
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="bg-[#569EFC] text-white p-3 rounded-2xl">
              {filterPriority === "" ? "Priority" : filterPriority}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {[1, 2, 3, 4, 5].map((priority) => (
                <DropdownMenuItem
                  onClick={() => setFilterPriority(priority.toString())}
                  key={priority}
                  value={priority}
                >
                  {priority}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="bg-[#569EFC] text-white p-3 rounded-2xl">
              {filterStatus === "" ? "Status" : filterStatus}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterStatus("pending")}>
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("finished")}>
                Finished
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <span
            onClick={handleClearFilters}
            className="text-[#569EFC] cursor-pointer"
          >
            Clear Filter
          </span>
        </div>
      </div>

      <TaskTable
        sortedTasks={sortedTasks}
        selectedRows={selectedRows}
        handleSelectRecords={handleSelectRecords}
      />
    </div>
  );
};

export default Tasks;
