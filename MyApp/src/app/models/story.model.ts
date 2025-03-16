export interface Story {
  id: string;
  name: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  projectId: string | null;
  createdAt: Date;
  status: 'todo' | 'doing' | 'done';
  ownerId: string;
}