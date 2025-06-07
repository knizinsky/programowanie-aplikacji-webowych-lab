import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { Story } from '../../models/story.model';
import { StoryService } from '../../services/story.service';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../../services/user.service';
import { User } from '../../services/user.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-story-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
  ],
  templateUrl: './story-dialog.component.html',
  styleUrls: ['./story-dialog.component.scss'],
})
export class StoryDialogComponent implements OnInit {
  storyForm!: FormGroup;
  isEdit = false;
  user!: User;

  constructor(
    private fb: FormBuilder,
    private storyService: StoryService,
    private userService: UserService,
    private dialogRef: MatDialogRef<StoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { story: Story | null; projectId: string }
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.data.story;

    this.storyForm = this.fb.group({
      name: [this.data.story?.name || '', Validators.required],
      description: [this.data.story?.description || '', Validators.required],
      priority: [this.data.story?.priority || 'low'],
      status: [this.data.story?.status || 'todo'],
    });

    this.userService.getUser().subscribe((u) => (this.user = u));
  }

  submit(): void {
    const story: Story = {
      id: this.data.story?.id || uuidv4(),
      name: this.storyForm.value.name,
      description: this.storyForm.value.description,
      priority: this.storyForm.value.priority,
      status: this.storyForm.value.status,
      projectId: this.data.projectId,
      createdAt: this.data.story?.createdAt || new Date(),
      ownerId: this.user.id,
    };

    this.isEdit
      ? this.storyService.updateStory(story)
      : this.storyService.saveStory(story);

    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
