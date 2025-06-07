export interface Task {
  id: string;
  name: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  storyId: string | null;
  estimatedTime: number; // Przewidywany czas wykonania w godzinach
  status: 'todo' | 'doing' | 'done';
  createdAt: Date;
  startDate: Date | null;
  endDate: Date | null;
  assignedUserId: string | null;
}