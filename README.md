# Enhanced Todo App

A smart task management application with priority-based sorting and time estimation features.

## 🎯 Key Benefits

* ✅ **Clear Focus:** Users can sort tasks by priority and time, helping them focus on what truly matters
* ✅ **Quick Wins:** Immediate visual cues for tasks that can be done quickly
* ✅ **Fast Completion:** Tasks with short durations are encouraged to be completed immediately
* ✅ **Real-Time Sync:** Smooth switch toggles to mark tasks as completed, with instant API calls

## ✨ Feature Details

### 📂 Task Fields

Each task now includes:
* `priority`: `"Low" | "Medium" | "High"`
* `estimatedTime`: Number (in minutes)

### 📥 Task Creation (Form)

While adding a task, the user provides:
* **Task Priority:** Select from Low, Medium, High
* **Estimated Time to Complete:** Input in minutes

### 💡 Smart Recommendation

If the estimated time is **less than or equal to 10 minutes**, the app automatically suggests:
*"This is a quick task. Finish it now!"*

### 🧮 Sorting Logic

Tasks are **sorted by:**
1. Priority (High > Medium > Low)
2. Estimated Time (Shortest First)

### 🏷️ Quick Filters

Additional filters:
* **Quick Wins:** Show tasks estimated to take ≤ 10 minutes
* **Priority-Based:** View tasks by selected priority

### 🔄 Switch to Complete

Tasks are marked as **completed using a Switch** component:
* When toggled, an API call is triggered to update the task status
* Real-time update using `useMutation` from React Query

## 📚 Technical Implementation

### 1. Task Form Additions

```tsx
<Select label="Priority" options={["Low", "Medium", "High"]} />
<TextField label="Estimated Time (min)" type="number" />
{estimatedTime <= 10 && (
  <p className="text-green-600">Quick Task! Finish it now!</p>
)}
```

### 2. Task Completion Switch

```tsx
<Switch 
  checked={todo.isCompleted} 
  onCheckedChange={(checked) => handleToggleComplete(todo.id, checked)} 
/>
```

### 3. API Integration

```tsx
const handleToggleComplete = (id: number, isCompleted: boolean) => {
  updateTask({ id, is_completed: isCompleted });
};
```

### 4. Task Sorting Example

```tsx
const priorityWeight = { High: 3, Medium: 2, Low: 1 };

const sortedTasks = tasks.sort((a, b) => {
  if (a.priority === b.priority) return a.estimatedTime - b.estimatedTime;
  return priorityWeight[b.priority] - priorityWeight[a.priority];
});
```

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies
3. Set up your API endpoints
4. Run the development server

## 🛠️ Technologies Used

* React
* React Query (for API state management)
* TypeScript
* Tailwind CSS

## ✅ Summary

This feature not only improves **task management efficiency** but also makes the app more engaging by providing actionable suggestions based on estimated effort. The combination of priority and time tracking makes this Todo app **stand out from standard task managers.**

## 📄 License

[Add your license here]

## 🤝 Contributing

[Add contribution guidelines here]