// src/hooks/useTodoTasks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import type { TodoItemAddUpdate } from "./../types/todo";

// 1. Fetch tasks
const fetchTasks = async () => {
  const { data, error } = await supabase.from("todo_tasks").select("*");
  if (error) throw new Error(error.message);
  return data;
};

export const useTasks = () => {
  return useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });
};

// 2. Add task
const addTask = async (newTask: TodoItemAddUpdate) => {
  const { data, error } = await supabase
    .from("todo_tasks")
    .insert([newTask])
    .select();
  if (error) throw new Error(error.message);
  return data;
};

// 3. Update task
const updateTask = async ({
  id,
  updatedTask,
}: {
  id: string;
  updatedTask: TodoItemAddUpdate;
}) => {
  const { data, error } = await supabase
    .from("todo_tasks")
    .update(updatedTask)
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);
  return data;
};

// 4. Delete task
const deleteTask = async (id: string) => {
  const { data, error } = await supabase
    .from("todo_tasks")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  return data;
};

export const useTodoTasks = () => {
  const queryClient = useQueryClient();

  const { data: tasks, isLoading, isError } = useTasks();

  const addTaskMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  return {
    tasks,
    isLoading,
    isError,
    addTask: addTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
  };
};
