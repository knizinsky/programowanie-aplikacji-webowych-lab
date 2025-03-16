import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StoryService } from '../../services/story.service';
import { Story } from '../../models/story.model';
import { v4 as uuidv4 } from 'uuid';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../services/user.service';

@Component({
  selector: 'app-story-form',
  templateUrl: './story-form.component.html',
  imports: [ReactiveFormsModule],
})
export class StoryFormComponent implements OnInit, OnDestroy {
  @Input() projectId!: string | null;
  private editingStorySub = new Subscription();
  storyForm: FormGroup;
  storyToEdit!: Story | null;
  user!: User;

  constructor(
    private fb: FormBuilder,
    private storyService: StoryService,
    private userService: UserService
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
      }
    );
  }

  saveStory(): void {
    const story: Story = {
      id: this.storyToEdit ? this.storyToEdit.id : uuidv4(),
      name: this.storyForm.value.name,
      description: this.storyForm.value.description,
      priority: this.storyForm.value.priority,
      projectId: this.projectId,
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
