import { Calendar24 } from "../ui/datepicker";
import { Input } from "../ui/input";

interface TaskFormProps {
  title: string;
  description: string;
  deadline: string;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  setDeadline: (value: string) => void;
}

export default function TaskForm({
  title,
  description,
  deadline,
  setTitle,
  setDescription,
  setDeadline,
}: TaskFormProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        placeholder="Title of the task"
      />

      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        placeholder="Description of the task"
      />

      <Calendar24
        deadline={deadline}
        onDeadlineChange={(value) => setDeadline(value)}
      />
    </div>
  );
}
