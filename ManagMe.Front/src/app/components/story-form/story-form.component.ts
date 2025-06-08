import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Story } from '../../models/story.model';
import { ProjectService } from '../../services/project.service';
import { StoryService } from '../../services/story.service';
import { User, UserService } from '../../services/user.service';

@Component({
  selector: 'app-story-form',
  templateUrl: './story-form.component.html',
  styleUrls: ['./story-form.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
  ],
})
export class StoryFormComponent implements OnInit, OnDestroy {
  private editingStorySub = new Subscription();
  storyForm: FormGroup;
  storyToEdit!: Story | null;
  user!: User;

  constructor(
    private readonly fb: FormBuilder,
    private readonly storyService: StoryService,
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
  ) {
    this.storyForm = this.fb.group({
      name: '',
      description: '',
      priority: 'low',
      status: 'todo',
    });
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
    });

    this.editingStorySub = this.storyService.currentEditingStory.subscribe(
      (story) => {
        this.storyToEdit = story;
        if (this.storyToEdit) {
          this.storyForm.patchValue(this.storyToEdit);
        }
      },
    );
  }

  saveStory(): void {
    const story: Story = {
      id: this.storyToEdit ? this.storyToEdit.id : uuidv4(),
      name: this.storyForm.value.name,
      description: this.storyForm.value.description,
      priority: this.storyForm.value.priority,
      projectId: this.projectService.currentProject.value?.id,
      createdAt: this.storyToEdit ? this.storyToEdit.createdAt : new Date(),
      status: this.storyForm.value.status,
      ownerId: this.user.id,
    };

    if (this.storyToEdit) {
      this.storyService.updateStory(story);
    } else {
      this.storyService.saveStory(story);
    }

    this.resetStoryForm();
  }

  resetStoryForm(): void {
    this.storyForm.reset();
    this.storyService.startEditingStory(null);
  }

  ngOnDestroy(): void {
    this.editingStorySub.unsubscribe();
  }
}
