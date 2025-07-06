import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { TodoItem } from '../types/todo';

// Extend dayjs with required plugins
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

export const dummyTodos = [
  {
    id: 1,
    title: 'Buy groceries',
    description: 'Milk, Bread, Eggs, Fruits',
    deadline: '06-07-2025 06:00 PM',
    isCompleted: false,
    createdAt: dayjs().date(1).hour(10).minute(0).second(0).toISOString(), // 1st of current month at 10:00 AM
    updatedAt: dayjs().date(2).hour(12).minute(0).second(0).toISOString(), // 2nd of current month at 12:00 PM
  },
  {
    id: 2,
    title: 'Workout',
    description: '30-minute cardio and strength training',
    deadline: '01-07-2025 08:00 PM',
    isCompleted: false,
    createdAt: dayjs().date(3).hour(9).minute(30).second(0).toISOString(),
    updatedAt: dayjs().date(4).hour(11).minute(0).second(0).toISOString(),
  },
  {
    id: 3,
    title: 'Read a book',
    description: 'Finish reading 20 pages of Atomic Habits',
    deadline: '07-07-2025 08:00 AM',
    isCompleted: true,
    createdAt: dayjs().date(5).hour(8).minute(0).second(0).toISOString(),
    updatedAt: dayjs().date(6).hour(10).minute(0).second(0).toISOString(),
  },
  {
    id: 4,
    title: 'Complete project report',
    description: 'Prepare and submit the final project report',
    deadline: '07-07-2025 03:00 PM',
    isCompleted: true,
    createdAt: dayjs().date(7).hour(14).minute(0).second(0).toISOString(),
    updatedAt: dayjs().date(8).hour(16).minute(0).second(0).toISOString(),
  },
  {
    id: 5,
    title: 'Call mom',
    description: 'Catch up with mom over a phone call',
    deadline: '07-08-2026 07:00 PM',
    isCompleted: false,
    createdAt: dayjs().date(9).hour(18).minute(0).second(0).toISOString(),
    updatedAt: dayjs().date(10).hour(20).minute(0).second(0).toISOString(),
  },
];


export const isTaskDelayed = (deadline: string, isCompleted: boolean) => {
  if (isCompleted) return false;

  const now = dayjs();
  const deadlineDate = dayjs(deadline, 'DD-MM-YYYY hh:mm A', true);

  return now.isAfter(deadlineDate);
};

export const getDelayDuration = (deadline: string) => {
  const now = dayjs();
  const deadlineDate = dayjs(deadline, 'DD-MM-YYYY hh:mm A', true);

  return now.to(deadlineDate); // Example: "3 days ago"
};


// // Function to format input datetime
// export const formatRelativeTime = (input: string) => {
// 	try {
// 		// Parse the input string with explicit format
// 		const inputDate = dayjs(input, 'DD-MM-YYYY hh:mm A', true);

// 		// Get the relative time
// 		return inputDate.fromNow();
// 	} catch (error) {
// 		console.error('Error parsing date:', error);
// 		return 'Invalid date';
// 	}
// };


export const formatRelativeTime = (input: string) => {
  try {
    // Parse the ISO format date directly
    const inputDate = dayjs(input);
    
    // Validate the parsed date
    if (!inputDate.isValid()) {
      return 'Invalid date';
    }

    // Get the relative time
    return inputDate.fromNow();
  } catch (error) {
    console.error('Error parsing date:', error);
    return 'Invalid date';
  }
};


export const filterFutureTasks = (tasks: TodoItem[] | undefined) =>  {
  const today = new Date();
  return tasks?.filter((task: { deadline: string | number | Date; }) => 
    new Date(task.deadline) > today
  );
}