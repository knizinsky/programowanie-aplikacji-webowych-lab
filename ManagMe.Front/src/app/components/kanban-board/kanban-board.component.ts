import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { Subscription } from 'rxjs';

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
export class KanbanBoardComponent implements OnInit, OnDestroy {
  private readonly taskService = inject(TaskService);
  private readonly cd = inject(ChangeDetectorRef);
  private taskChangeSub = new Subscription();
  tasks: Task[] = [];
  todo: Task[] = [];
  doing: Task[] = [];
  done: Task[] = [];

  @Output() editRequested = new EventEmitter<Task>();

  ngOnInit(): void {
    this.taskChangeSub = this.taskService.onTasksChange.subscribe(() => {
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

  ngOnDestroy(): void {
    this.taskChangeSub.unsubscribe();
  }
}
