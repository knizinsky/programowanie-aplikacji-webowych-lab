import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoryService } from '../../services/story.service';
import { ProjectService } from '../../services/project.service';
import { Story } from '../../models/story.model';
import { Subscription } from 'rxjs';
import { StoryFormComponent } from '../story-form/story-form.component';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  imports: [StoryFormComponent],
})
export class StoryListComponent implements OnInit, OnDestroy {
  private storiesChangeSub = new Subscription();
  private currentProjectSub = new Subscription();
  stories: Story[] = [];
  currentProjectId: string | null = null;

  get todoStories(): Story[] {
    return this.stories.filter((story) => story.status === 'todo');
  }

  get doingStories(): Story[] {
    return this.stories.filter((story) => story.status === 'doing');
  }

  get doneStories(): Story[] {
    return this.stories.filter((story) => story.status === 'done');
  }

  constructor(
    private storyService: StoryService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.subToStoriesChange();
    this.subToCurrentProject();
  }

  private subToStoriesChange(): void {
    this.storiesChangeSub = this.storyService.onStoriesChange.subscribe(() => {
      this.getStories();
    });
  }

  private subToCurrentProject(): void {
    this.currentProjectSub = this.projectService.currentProject.subscribe(
      (project) => {
        this.currentProjectId = project ? project.id : null;
        this.getStories();
      }
    );
  }

  private getStories(): void {
    if (this.currentProjectId) {
      this.stories = this.storyService
        .getStories()
        .filter((story) => story.projectId === this.currentProjectId);
    } else {
      this.stories = [];
    }
  }

  deleteStory(id: string): void {
    this.storyService.deleteStory(id);
  }

  editStory(story: Story): void {
    this.storyService.startEditingStory(story);
  }

  ngOnDestroy(): void {
    this.storiesChangeSub.unsubscribe();
    this.currentProjectSub.unsubscribe();
  }
}
