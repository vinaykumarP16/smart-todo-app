import { useQuery, type QueryFunction } from '@tanstack/react-query';
import { supabase } from '../supabaseClient';
import type { TodoItem } from '../types/todo';

// Fetch function
const fetchTasks: QueryFunction<TodoItem[], ['tasks']> = async () => {
  const { data, error } = await supabase.from('todo_tasks').select('*');

  if (error) throw new Error(error.message);
  return data;
};

// Custom hook
export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],   // ✅ New syntax in v5
    queryFn: fetchTasks,   // ✅ New syntax in v5
  });
};
