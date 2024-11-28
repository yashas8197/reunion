import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { addTask } from "@/utils/taskSlice";
import { useDispatch } from "react-redux";

const AddTask = ({ isDialogOpen, setIsDialogOpen }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    priority: "",
    status: false,
    startTime: "",
    endTime: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSwitchChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      status: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const task = {
      title: formData.title,
      priority: formData.priority,
      status: formData.status ? "finished" : "pending",
      startTime: formData.startTime,
      endTime: formData.endTime,
    };

    dispatch(addTask(task));

    // Reset form
    setFormData({
      title: "",
      priority: "",
      status: false,
      startTime: "",
      endTime: "",
    });
    setIsDialogOpen(false);
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="text-[#569EFC]" variant="outline">
          + Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>Task ID: 3</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="block font-semibold">
              Title:
            </label>
            <Input
              id="title"
              name="title"
              type="text"
              className="mt-2 w-full p-2 border rounded"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="priority" className="block font-semibold">
              Priority:
            </label>
            <Input
              id="priority"
              name="priority"
              type="number"
              min="1"
              max="5"
              className="mt-2 w-full p-2 border rounded"
              value={formData.priority}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="status" className="block font-semibold">
              Status:
            </label>
            <div className="mt-2 flex gap-3 items-center">
              <p>Pending</p>
              <Switch
                id="status"
                name="status"
                checked={formData.status}
                onCheckedChange={handleSwitchChange}
              />
              <p>Finished</p>
            </div>
          </div>

          <div>
            <div className="flex flex-col md:flex-row justify-between gap-2">
              <label htmlFor="startTime" className="block font-semibold">
                Start Time:
              </label>
              <label htmlFor="endTime" className="block font-semibold">
                End Time:
              </label>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-2">
              <Input
                id="startTime"
                name="startTime"
                type="datetime-local"
                className="mt-2 w-full p-2 border rounded"
                value={formData.startTime}
                onChange={handleChange}
              />

              <Input
                id="endTime"
                name="endTime"
                type="datetime-local"
                className="mt-2 w-full p-2 border rounded"
                value={formData.endTime}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-4 text-right">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Add Task
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTask;
