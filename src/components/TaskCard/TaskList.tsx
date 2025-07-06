import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { useTasks } from "../../hooks/useTasks";
import { useTodoTasks } from "../../hooks/useTodoTask";
import CommonDialog from "../Dialog/Dialog";
import { Button } from "../ui/button";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";

type TaskFilter = "all" | "completed" | "pending" | "overdue" | "upcoming";

export default function TaskList() {
  const { data: tasks = [] } = useTasks();
  const { addTask } = useTodoTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [filter, setFilter] = useState<TaskFilter>("all");

  // Task counts for each filter
  const taskCounts = {
    completed: tasks.filter((task) => task.is_completed).length,
    pending: tasks.filter((task) => !task.is_completed).length,
    overdue: tasks.filter(
      (task) => !task.is_completed && dayjs(task.deadline).isBefore(dayjs())
    ).length,
    upcoming: tasks.filter((task) => dayjs(task.deadline).isAfter(dayjs()))
      .length,
  };

  // const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setDeadlineDate("");
    // setOpen(false);
  };

  const handleAddTask = () => {
    if (!title || !deadlineDate) {
      toast.error("Title and Deadline are required");
      return;
    }

    addTask(
      {
        title,
        description,
        deadline: dayjs(deadlineDate).toISOString(),
        is_completed: false,
        created_at: dayjs().toISOString(),
        id: uuid(),
      },
      {
        onSuccess: () => {
          toast.success("Task Created Successfully");
          handleClose();
        },
        onError: () => {
          toast.error("Failed to create task");
        },
      }
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const now = dayjs();
    const taskDeadline = dayjs(task.deadline);

    switch (filter) {
      case "completed":
        return task.is_completed;
      case "pending":
        return !task.is_completed;
      case "overdue":
        return !task.is_completed && taskDeadline.isBefore(now);
      case "upcoming":
        return taskDeadline.isAfter(now);
      default:
        return true; // show all
    }
  });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4 flex-wrap">
          {(
            [
              "all",
              "completed",
              "pending",
              "overdue",
              "upcoming",
            ] as TaskFilter[]
          ).map((filterType) => (
            <Button
              key={filterType}
              color={
                filterType === "completed"
                  ? "success"
                  : filterType === "pending"
                  ? "warning"
                  : filterType === "overdue"
                  ? "error"
                  : "primary"
              }
              onClick={() => setFilter(filterType)}
            >
              {filterType === "all" ? "All" : filterType}:{" "}
              {filterType === "all" ? tasks.length : taskCounts[filterType]}
            </Button>
          ))}
        </div>

        <CommonDialog
          title="Add Task"
          onDisagree={handleClose}
          content={
            <TaskForm
              title={title}
              description={description}
              deadline={deadlineDate}
              setTitle={setTitle}
              setDescription={setDescription}
              setDeadline={setDeadlineDate}
            />
          }
          onAgree={handleAddTask}
          agreeText="Add Task"
          disagreeText="Cancel"
        >
          <Button className="p-2 bg-blue-600 text-white rounded">
            Add Task
          </Button>
        </CommonDialog>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => <TaskCard key={task.id} todo={task} />)
        ) : (
          <div className="col-span-full flex justify-center items-center h-64">
            <h1 className="text-gray-500 dark:text-gray-400 text-xl">
              No Tasks To Display
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
