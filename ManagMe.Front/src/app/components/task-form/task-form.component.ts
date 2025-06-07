import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { v4 as uuidv4 } from 'uuid';
import { Subscription } from 'rxjs';
import { UserService, User } from '../../services/user.service';
import { Story } from '../../models/story.model';
import { StoryService } from '../../services/story.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
  ],
})
export class TaskFormComponent implements OnInit, OnDestroy {
  private editingTaskSub = new Subscription();
  taskForm: FormGroup;
  taskToEdit!: Task | null;
  users: User[] = [];
  stories: Story[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly taskService: TaskService,
    private readonly userService: UserService,
    private readonly storyService: StoryService
  ) {
    this.taskForm = this.fb.group({
      name: '',
      description: '',
      priority: 'low',
      estimatedTime: 0,
      assignedUserId: null,
      status: 'todo',
      storyId: null,
    });
  }

  ngOnInit(): void {
    this.users = this.userService
      .getUsers()
      .filter((user) => user.role === 'developer' || user.role === 'devops');

    this.stories = this.storyService.getStories();

    this.editingTaskSub = this.taskService.currentEditingTask.subscribe(
      (task) => {
        this.taskToEdit = task;
        if (this.taskToEdit) {
          this.taskForm.patchValue(this.taskToEdit);
        }
      }
    );
  }

  saveTask(): void {
    const task: Task = {
      id: this.taskToEdit ? this.taskToEdit.id : uuidv4(),
      name: this.taskForm.value.name,
      description: this.taskForm.value.description,
      priority: this.taskForm.value.priority,
      storyId: this.taskForm.value.storyId,
      estimatedTime: this.taskForm.value.estimatedTime,
      status: this.taskForm.value.status,
      createdAt: this.taskToEdit?.createdAt || new Date(),
      startDate: this.taskToEdit?.startDate || null,
      endDate: this.taskToEdit?.endDate || null,
      assignedUserId: this.taskForm.value.assignedUserId,
    };

    if (this.taskToEdit) {
      this.taskService.updateTask(task);
    } else {
      this.taskService.saveTask(task);
    }

    this.resetTaskForm();
  }

  resetTaskForm(): void {
    this.taskForm.reset();
    this.taskService.startEditingTask(null);
  }

  ngOnDestroy(): void {
    this.editingTaskSub.unsubscribe();
  }
}
