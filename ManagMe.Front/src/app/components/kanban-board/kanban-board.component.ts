import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
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

  constructor(
    private readonly taskService: TaskService,
    private readonly cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.taskService.onTasksChange.subscribe(() => {
      this.updateTasks();
      this.cd.markForCheck();
    });
    this.updateTasks();
  }

 async updateTasks(): Promise<void> {
    this.tasks = await this.taskService.getTasks();
    this.todo = this.tasks.filter((task) => task.status === 'todo');
    this.doing = this.tasks.filter((task) => task.status === 'doing');
    this.done = this.tasks.filter((task) => task.status === 'done');
  }
}
