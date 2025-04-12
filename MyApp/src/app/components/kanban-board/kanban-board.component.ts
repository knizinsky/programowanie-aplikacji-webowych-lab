import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  imports: [TaskDetailsComponent],
})
export class KanbanBoardComponent implements OnInit {
  tasks: Task[] = [];
  todo: Task[] = [];
  doing: Task[] = [];
  done: Task[] = [];

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
