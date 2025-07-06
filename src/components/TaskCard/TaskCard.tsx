import React, { useState } from "react";
import { toast } from "react-toastify";
import { useTodoTasks } from "../../hooks/useTodoTask";
import type { TodoItem } from "../../types/todo";
import { formatRelativeTime, isTaskDelayed } from "../../utils/utils";
import TaskCardActions from "./TaskCardActions";

interface TaskCardProps {
  todo: TodoItem;
}

const TaskCard: React.FC<TaskCardProps> = ({ todo }) => {
  const [isCompleted, setIsCompleted] = useState(todo.is_completed);
  const { deleteTask } = useTodoTasks();

  const toggleCompletion = () => {
    setIsCompleted((prev) => !prev);
  };

  const handleDelete = (id: string) => {
    deleteTask(id, {
      onSuccess: () => {
        toast.success("Task is deleted Successfully");
      },
    });
  };

  return (
    <div className="relative p-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="pr-16">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {todo.title}
        </h3>

        <p className="text-gray-700 dark:text-gray-300 mb-2">
          {todo.description}
        </p>

        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Deadline: {formatRelativeTime(todo.deadline)}</span>
          {isTaskDelayed(todo.deadline, todo.is_completed) && (
            <span className="font-medium text-red-500">(Delayed)</span>
          )}
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          Priority: <b>{todo.priority}</b>
        </p>
        <p
          className={`text-sm font-medium mb-2 ${
            isCompleted
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          } animate-pulse`}
        >
          {isCompleted ? "Completed" : "Pending"}
        </p>
      </div>

      <div className="absolute top-4 right-4">
        <TaskCardActions
          isCompleted={isCompleted}
          toggleCompletion={toggleCompletion}
          taskDelete={handleDelete}
          taskId={todo.id}
          todoDetails={todo}
        />
      </div>
    </div>
  );
};

export default TaskCard;
