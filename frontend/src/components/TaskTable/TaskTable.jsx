import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, getTotalTimeToFinish } from "@/utils/helpers.js";
import EditTaskDialog from "../EditTaskDialog/EditTaskDialog";
import { useDispatch } from "react-redux";
import { setEditTask } from "@/utils/taskSlice";

const TaskTable = ({ sortedTasks, selectedRows, handleSelectRecords }) => {
  const dispatch = useDispatch();
  const [isDialogOpenEdit, setIsDialogOpenEdit] = useState(false);
  const handleEditClick = (task) => {
    dispatch(setEditTask(task));
    setIsDialogOpenEdit(true);
  };
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
            <TableHead>Task Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="px-10">Start time</TableHead>
            <TableHead className="px-10">End time</TableHead>
            <TableHead>Total time to finish (hrs)</TableHead>
            <TableHead>Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTasks.length > 0 ? (
            sortedTasks.map((task, i) => (
              <TableRow key={task._id}>
                <TableCell>
                  <input
                    type="checkbox"
                    value={task._id}
                    checked={selectedRows.includes(task._id)}
                    onChange={handleSelectRecords}
                    className="w-4 h-4 text-[#569EFC] border-gray-300 rounded focus:ring-[#569EFC]"
                  />
                </TableCell>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell className="px-10">
                  {formatDate(task.startTime)}
                </TableCell>
                <TableCell className="px-10">
                  {formatDate(task.endTime)}
                </TableCell>
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
                    className="text-[#569EFC] hover:underline"
                  >
                    🖋️
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center">
                No tasks available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TaskTable;
