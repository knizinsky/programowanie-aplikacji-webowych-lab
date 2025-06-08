export interface Story {
  id: string;
  name: string;
  description: string;
  priority: StoryPriority;
  projectId: string | undefined;
  createdAt: Date;
  status: StoryStatus;
  ownerId: string;
}

type StoryStatus = 'todo' | 'doing' | 'done';
type StoryPriority = 'low' | 'medium' | 'high';
