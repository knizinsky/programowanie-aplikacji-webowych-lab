import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss'],
  imports: [
    TaskDetailsComponent,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
  ],
})
export class KanbanBoardComponent implements OnInit {
  tasks: Task[] = [];
  todo: Task[] = [];
  doing: Task[] = [];
  done: Task[] = [];

  @Output() editRequested = new EventEmitter<Task>();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.onTasksChange.subscribe(() => this.updateTasks());
    this.updateTasks();
  }

  updateTasks(): void {
    this.tasks = this.taskService.getTasks();
    this.todo = this.tasks.filter((task) => task.status === 'todo');
    this.doing = this.tasks.filter((task) => task.status === 'doing');
    this.done = this.tasks.filter((task) => task.status === 'done');
  }
}
