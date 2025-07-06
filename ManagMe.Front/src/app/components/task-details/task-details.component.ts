import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { StoryService } from '../../services/story.service';
import { DatePipe } from '@angular/common';

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
    DatePipe,
  ],
})
export class TaskDetailsComponent implements OnInit {
  private readonly taskService = inject(TaskService);
  private readonly userService = inject(UserService);
  private readonly storyService = inject(StoryService);
  private readonly cd = inject(ChangeDetectorRef);
  users: User[] = [];
  taskStoryName: string | undefined;
  taskUserName: string | undefined;

  @Input() task!: Task;
  @Output() editRequested = new EventEmitter<Task>();
  @Output() deleted = new EventEmitter<string>();

  async ngOnInit(): Promise<void> {
    this.users = await this.userService.getUsers();
    const taskUser = this.users.find(
      (user) => user.id === this.task.assignedUserId,
    );
    this.taskUserName = `${taskUser?.firstName} ${taskUser?.lastName}`;
    this.taskStoryName = await this.storyService
      .getStories()
      .then((stories) => {
        const story = stories.find((s) => s.id === this.task.storyId);
        return story ? story.name : undefined;
      });
    if (this.task.assignedUserId) {
      this.task.status = 'doing';
    }
  }

  assignUser(e: MatSelectChange): void {
    const userId = (e as any).target.value;
    this.task.assignedUserId = userId;
    this.task.status = 'doing';
    this.task.startDate = new Date();
    this.taskService.updateTask(this.task);
    this.cd.markForCheck();
  }

  markAsDone(): void {
    this.task.status = 'done';
    this.task.endDate = new Date();
    this.taskService.updateTask(this.task);
    this.cd.markForCheck();
  }

  deleteTask(): void {
    this.taskService.deleteTask(this.task.id);
    this.deleted.emit(this.task.id);
  }
}
