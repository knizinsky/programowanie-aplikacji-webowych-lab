import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly storageKey = 'tasks';
  readonly onTasksChange = new Subject<void>();
  readonly currentEditingTask = new BehaviorSubject<Task | null>(null);

  getTasks(): Task[] {
    const tasks = localStorage.getItem(this.storageKey);
    return tasks ? JSON.parse(tasks) : [];
  }

  saveTask(task: Task): void {
    const tasks = this.getTasks();
    tasks.push(task);
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    this.onTasksChange.next();
  }

  updateTask(updatedTask: Task): void {
    const tasks = this.getTasks();
    const index = tasks.findIndex((t) => t.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }
    this.onTasksChange.next();
  }

  deleteTask(taskId: string): void {
    let tasks = this.getTasks();
    tasks = tasks.filter((t) => t.id !== taskId);
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    this.onTasksChange.next();
  }

  startEditingTask(task: Task | null): void {
    this.currentEditingTask.next(task);
  }
}
