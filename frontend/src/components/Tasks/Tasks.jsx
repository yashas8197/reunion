import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditTaskDialog from "../EditTaskDialog/EditTaskDialog";
import AddTask from "../AddTask/AddTask";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, fetchTasks, setEditTask } from "@/utils/taskSlice";
import { formatDate, getTotalTimeToFinish } from "@/utils/helpers.js";

const Tasks = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpenEdit, setIsDialogOpenEdit] = useState(false);
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
      setSelectedRows((prev) => [...prev, value]); // Add to state
    } else {
      setSelectedRows((prev) => prev.filter((row) => row !== value)); // Remove from state
    }
  };

  const handleDeleteSelected = () => {
    if (selectedRows.length > 0) {
      selectedRows.forEach((row) => dispatch(deleteTask(row)));
    }
  };

  const handleEditClick = (task) => {
    dispatch(setEditTask(task));
    setIsDialogOpenEdit(true);
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
            <DropdownMenuTrigger className="bg-blue-500 text-white p-3 rounded-2xl">
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
            <DropdownMenuTrigger className="bg-blue-500 text-white p-3 rounded-2xl">
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
            <DropdownMenuTrigger className="bg-blue-500 text-white p-3 rounded-2xl">
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
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </TableHead>
            <TableHead>Task Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start time</TableHead>
            <TableHead>End time</TableHead>
            <TableHead>Total time to finish (hrs)</TableHead>
            <TableHead>Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTasks.map((task, i) => (
            <TableRow key={task._id}>
              <TableCell>
                <input
                  type="checkbox"
                  value={task._id}
                  checked={selectedRows.includes(task._id)}
                  onChange={handleSelectRecords}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </TableCell>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{formatDate(task.startTime)}</TableCell>
              <TableCell>{formatDate(task.endTime)}</TableCell>
              <TableCell>
                {getTotalTimeToFinish(task.startTime, task.endTime)}
              </TableCell>
              <TableCell>
                <EditTaskDialog
                  isDialogOpenEdit={isDialogOpenEdit}
                  setIsDialogOpenEdit={setIsDialogOpenEdit}
                />
                <button
                  onClick={() => handleEditClick(task)}
                  className="text-blue-500 hover:underline"
                >
                  🖋️
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Tasks;
