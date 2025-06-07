import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

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

  private updateTasks(): void {
    this.tasks = this.taskService.getTasks();
    this.todo = this.tasks.filter((task) => task.status === 'todo');
    this.doing = this.tasks.filter((task) => task.status === 'doing');
    this.done = this.tasks.filter((task) => task.status === 'done');
  }
}
