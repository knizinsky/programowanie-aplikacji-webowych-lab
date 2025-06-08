import { Injectable } from '@angular/core';
import { supabase } from '../supabase.client';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskSupabaseService {
  async getTasks(): Promise<Task[]> {
    const { data, error } = await supabase.from('tasks').select('*');
    if (error) {
      console.error('Failed to fetch tasks', error.message);
      return [];
    }
    return data.map((t: Record<string, unknown>) => this.mapTask(t));
  }

  async saveTask(task: Task): Promise<void> {
    const dbTask = this.unmapTask(task);
    const { error } = await supabase.from('tasks').insert([dbTask]);
    if (error) {
      console.error('Failed to save task', error.message);
    }
  }

  async updateTask(task: Task): Promise<void> {
    const dbTask = this.unmapTask(task);
    const { error } = await supabase
      .from('tasks')
      .update(dbTask)
      .eq('id', task.id);
    if (error) {
      console.error('Failed to update task', error.message);
    }
  }

  async deleteTask(taskId: string): Promise<void> {
    const { error } = await supabase.from('tasks').delete().eq('id', taskId);
    if (error) {
      console.error('Failed to delete task', error.message);
    }
  }

  private mapTask(dbTask: Record<string, unknown>): Task {
    return {
      id: dbTask['id'] as string,
      name: dbTask['name'] as string,
      description: dbTask['description'] as string,
      priority: dbTask['priority'] as 'low' | 'medium' | 'high',
      estimatedTime: dbTask['estimated_time'] as number,
      createdAt: new Date(dbTask['created_at'] as string),
      startDate: dbTask['start_date'] as Date | null,
      endDate: dbTask['end_date'] as Date | null,
      status: dbTask['status'] as 'todo' | 'doing' | 'done',
      assignedUserId: dbTask['assigned_user_id'] as string | null,
      storyId: dbTask['story_id'] as string | null,
    };
  }

  private unmapTask(task: Task): Record<string, unknown> {
    return {
      id: task.id,
      name: task.name,
      description: task.description,
      priority: task.priority,
      estimated_time: task.estimatedTime,
      created_at: task.createdAt.toISOString(),
      start_date: task.startDate ? task.startDate.toISOString() : null,
      end_date: task.endDate ? task.endDate.toISOString() : null,
      status: task.status,
      assigned_user_id: task.assignedUserId,
      story_id: task.storyId,
    };
  }
}
