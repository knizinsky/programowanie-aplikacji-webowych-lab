export interface Task {
  id: string;
  name: string;
  description: string;
  priority: TaskPriority;
  storyId: string | null;
  estimatedTime: number;
  status: TaskStatus;
  createdAt: Date;
  startDate: Date | null;
  endDate: Date | null;
  assignedUserId: string | null;
}

type TaskStatus = 'todo' | 'doing' | 'done';
type TaskPriority = 'low' | 'medium' | 'high';
