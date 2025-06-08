import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { v4 as uuidv4 } from 'uuid';
import { Story } from '../../models/story.model';
import { Task } from '../../models/task.model';
import { StoryService } from '../../services/story.service';
import { TaskService } from '../../services/task.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class TaskDialogComponent implements OnInit {
  taskForm!: FormGroup;
  users: User[] = [];
  stories: Story[] = [];
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private storyService: StoryService,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task | null },
  ) {}

  ngOnInit(): void {
    this.users = this.userService
      .getUsers()
      .filter((u) => ['developer', 'devops'].includes(u.role));
    this.stories = this.storyService.getStories();
    this.isEdit = !!this.data.task;

    const t = this.data.task;

    this.taskForm = this.fb.group({
      name: [t?.name || '', Validators.required],
      description: [t?.description || '', Validators.required],
      priority: [t?.priority || 'low'],
      estimatedTime: [t?.estimatedTime || 0],
      assignedUserId: [t?.assignedUserId || null],
      storyId: [t?.storyId || null],
    });
  }

  submit(): void {
    const form = this.taskForm.value;

    const task: Task = {
      id: this.data.task?.id || uuidv4(),
      name: form.name,
      description: form.description,
      priority: form.priority,
      estimatedTime: form.estimatedTime,
      status: form.assignedUserId ? 'doing' : 'todo',
      createdAt: this.data.task?.createdAt || new Date(),
      startDate: this.data.task?.startDate || null,
      endDate: this.data.task?.endDate || null,
      assignedUserId: form.assignedUserId,
      storyId: form.storyId,
    };

    this.isEdit
      ? this.taskService.updateTask(task)
      : this.taskService.saveTask(task);

    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
