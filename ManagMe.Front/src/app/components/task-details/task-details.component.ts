import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { User, UserService } from '../../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
  ],
})
export class TaskDetailsComponent implements OnInit {
  @Input() task!: Task;
  users: User[] = [];

  constructor(
    private readonly taskService: TaskService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      console.log(this.task);
    }, 2000);
    this.users = this.userService.getUsers();
  }

  assignUser(e: MatSelectChange): void {
    const userId = (e as any).target.value;
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
