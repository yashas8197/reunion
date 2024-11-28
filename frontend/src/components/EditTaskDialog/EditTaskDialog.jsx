import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "@/utils/taskSlice";

const EditTaskDialog = ({ isDialogOpenEdit, setIsDialogOpenEdit }) => {
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedPriority, setUpdatedPriority] = useState("");
  const [updatedStartTime, setUpdatedStartTime] = useState("");
  const [updatedEndTime, setUpdatedEndTime] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const dispatch = useDispatch();

  const { editTask } = useSelector((store) => store.tasks);

  useEffect(() => {
    if (editTask) {
      setUpdatedTitle(editTask.title || "");
      setUpdatedPriority(editTask.priority || "");
      setUpdatedStartTime(
        editTask.startTime
          ? new Date(editTask.startTime).toISOString().slice(0, 16)
          : ""
      );
      setUpdatedEndTime(
        editTask.endTime
          ? new Date(editTask.endTime).toISOString().slice(0, 16)
          : ""
      );
      setIsFinished(editTask.status === "finished");
    }
  }, [editTask]);

  const handleStatusToggle = () => {
    setIsFinished(!isFinished);
  };

  const updateEdit = () => {
    const updatedTask = {
      title: updatedTitle,
      priority: updatedPriority,
      startTime: updatedStartTime,
      endTime: updatedEndTime,
      status: isFinished ? "finished" : "pending",
    };
    dispatch(updateTask({ id: editTask._id, updatedTask }));
    setIsDialogOpenEdit(false);
  };

  return (
    <Dialog open={isDialogOpenEdit} onOpenChange={setIsDialogOpenEdit}>
      <DialogContent className={isDialogOpenEdit ? "" : "inert"}>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>Task ID: {editTask?._id}</DialogDescription>
        </DialogHeader>

        {/* Title input */}
        <div>
          <label htmlFor="title" className="block font-semibold">
            Title:
          </label>
          <Input
            id="title"
            name="title"
            type="text"
            className="mt-2 w-full p-2 border rounded"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
        </div>

        {/* Priority input */}
        <div>
          <label htmlFor="priority" className="block font-semibold">
            Priority:
          </label>
          <Input
            id="priority"
            name="priority"
            type="number"
            className="mt-2 w-full p-2 border rounded"
            value={updatedPriority}
            onChange={(e) => setUpdatedPriority(e.target.value)}
          />
        </div>

        {/* Status switch */}
        <div>
          <label htmlFor="status" className="block font-semibold">
            Status:
          </label>
          <div className="mt-2 flex gap-3 items-center">
            <p>Pending</p>
            <Switch checked={isFinished} onCheckedChange={handleStatusToggle} />
            <p>Finished</p>
          </div>
        </div>

        {/* Start time and end time inputs */}
        <div>
          <div className="flex justify-between gap-2">
            <label htmlFor="startTime" className="block font-semibold">
              Start Time:
            </label>
            <label htmlFor="endTime" className="block font-semibold">
              End Time:
            </label>
          </div>
          <div className="flex justify-between gap-2">
            <Input
              id="startTime"
              name="startTime"
              type="datetime-local"
              className="mt-2 w-full p-2 border rounded"
              value={updatedStartTime}
              onChange={(e) => setUpdatedStartTime(e.target.value)}
            />
            <Input
              id="endTime"
              name="endTime"
              type="datetime-local"
              className="mt-2 w-full p-2 border rounded"
              value={updatedEndTime}
              onChange={(e) => setUpdatedEndTime(e.target.value)}
            />
          </div>
        </div>

        {/* Update button */}
        <div className="mt-4 text-right">
          <button
            onClick={updateEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;
