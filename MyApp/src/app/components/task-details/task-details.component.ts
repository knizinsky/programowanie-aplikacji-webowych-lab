import { Component, Input } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
})
export class TaskDetailsComponent {
  @Input() task!: Task;

  constructor(private taskService: TaskService) {}

  assignUser(userId: string): void {
    this.task.assignedUserId = userId;
    this.task.status = 'doing';
    this.task.startDate = new Date();
    this.taskService.updateTask(this.task);
  }

  markAsDone(): void {
    this.task.status = 'done';
    this.task.endDate = new Date();
    this.taskService.updateTask(this.task);
  }
}