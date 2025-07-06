import { Component, inject, Inject, OnInit } from '@angular/core';
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
import { ProjectService } from '../../services/project.service';
import { StoryService } from '../../services/story.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

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
  private readonly fb = inject(FormBuilder);
  private readonly storyService = inject(StoryService);
  private readonly userService = inject(UserService);
  private readonly projectService = inject(ProjectService);
  private readonly dialogRef = inject(MatDialogRef<StoryDialogComponent>);
  public readonly data = inject<{ story: Story | null; projectId: string }>(
    MAT_DIALOG_DATA,
  );
  private user!: User | null;
  storyForm!: FormGroup;
  isEdit = false;

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
    const projectId = this.projectService.currentProject.value?.id;

    const story: Story = {
      id: this.data.story?.id || uuidv4(),
      name: this.storyForm.value.name,
      description: this.storyForm.value.description,
      priority: this.storyForm.value.priority,
      status: this.storyForm.value.status,
      projectId,
      createdAt: this.data.story?.createdAt || new Date(),
      ownerId: this.user?.id,
    };

    if (this.isEdit) {
      this.storyService.updateStory(story);
    } else {
      this.storyService.saveStory(story);
    }

    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
