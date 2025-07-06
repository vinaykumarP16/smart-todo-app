
export interface TodoItem {
  id: string;
  title: string;
  description: string;
  deadline: string;  
  is_completed: boolean;
  createdAt: string;
  updatedAt?: string;
  priority:boolean;
}

export interface TodoItemAddUpdate{
  id?: string;
  title: string;
  description: string;
  deadline: string;  
  is_completed: boolean;
  created_at: string;
  updated_at?: string;
}