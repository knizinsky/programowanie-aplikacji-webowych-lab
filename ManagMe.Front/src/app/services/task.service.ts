import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Task } from '../models/task.model';
import { TaskSupabaseService } from './task-supabase.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  readonly onTasksChange = new Subject<void>();
  readonly currentEditingTask = new BehaviorSubject<Task | null>(null);

  taskSupabaseService = inject(TaskSupabaseService);

  async getTasks(): Promise<Task[]> {
    return this.taskSupabaseService.getTasks();
  }

  async saveTask(task: Task): Promise<void> {
    await this.taskSupabaseService.saveTask(task);
    this.onTasksChange.next();
  }

  async updateTask(updatedTask: Task): Promise<void> {
    await this.taskSupabaseService.updateTask(updatedTask);
    this.onTasksChange.next();
  }

  async deleteTask(taskId: string): Promise<void> {
    await this.taskSupabaseService.deleteTask(taskId);
    this.onTasksChange.next();
  }

  startEditingTask(task: Task | null): void {
    this.currentEditingTask.next(task);
  }
}
