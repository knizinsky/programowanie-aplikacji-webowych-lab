export interface Task {
  id: string;
  name: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  storyId: string | null;
  estimatedTime: number;
  status: 'todo' | 'doing' | 'done';
  createdAt: Date;
  startDate: Date | null;
  endDate: Date | null;
  assignedUserId: string | null;
}
