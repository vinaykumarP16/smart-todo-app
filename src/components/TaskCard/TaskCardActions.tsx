import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Button } from "../ui/button";
import CommonDialog from "../Dialog/Dialog";
import TaskForm from "./TaskForm";
import { useTodoTasks } from "../../hooks/useTodoTask";
import type { TodoItem } from "../../types/todo";
import dayjs from "dayjs";
import { toast } from "react-toastify";

interface TaskCardActionsProps {
  isCompleted: boolean;
  toggleCompletion: () => void;
  taskDelete: (id: string) => void;
  taskId: string;
  todoDetails: TodoItem;
}

const TaskCardActions: React.FC<TaskCardActionsProps> = ({
  taskDelete,
  taskId,
  todoDetails,
}) => {
  const [title, setTitle] = useState(todoDetails?.title);
  const [description, setDescription] = useState(todoDetails?.description);
  const [deadlineDate, setDeadlineDate] = useState(todoDetails?.deadline);
  const { updateTask } = useTodoTasks();


  const handleClose = () => {
    setTitle("");
    setDescription("");
    setDeadlineDate("");
  };

  const handleUpdateTask = () => {
    const updatedValues = {
      title: title,
      description: description,
      deadline: deadlineDate,
      is_completed: todoDetails.is_completed,
      created_at: todoDetails.createdAt,
      updated_at: dayjs().toISOString(),
    };
    updateTask(
      {
        id: taskId,
        updatedTask: updatedValues,
      },
      {
        onSuccess: () => {
          toast.success("Task Updated Successfully");
          handleClose();
        },
      }
    );
  };

  return (
    <>
      <CommonDialog
        title="Edit Task"
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
        onAgree={handleUpdateTask}
        agreeText="Update Task"
        disagreeText="Cancel"
      >
        <Button>
          <MdEdit />
        </Button>
      </CommonDialog>

      <Button className="ml-2" color="primary" onClick={() => taskDelete(taskId)}>
        <MdDelete />
      </Button>
    </>
  );
};

export default TaskCardActions;
