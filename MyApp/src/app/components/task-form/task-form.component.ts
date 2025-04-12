import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { v4 as uuidv4 } from 'uuid';
import { Subscription } from 'rxjs';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  imports: [ReactiveFormsModule],
})
export class TaskFormComponent implements OnInit, OnDestroy {
  @Input() storyId!: string | null;
  private editingTaskSub = new Subscription();
  taskForm: FormGroup;
  taskToEdit!: Task | null;
  users: User[] = [];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private userService: UserService
  ) {
    this.taskForm = this.fb.group({
      name: '',
      description: '',
      priority: 'low',
      estimatedTime: 0,
      assignedUserId: null,
      status: 'todo',
    });
  }

  ngOnInit(): void {
    this.users = this.userService.getUsers().filter(
      (user) => user.role === 'developer' || user.role === 'devops'
    );

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
      storyId: this.storyId,
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