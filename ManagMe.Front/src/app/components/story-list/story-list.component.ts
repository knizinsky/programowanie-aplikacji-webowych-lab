import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Subscription } from 'rxjs';
import { Story } from '../../models/story.model';
import { ProjectService } from '../../services/project.service';
import { StoryService } from '../../services/story.service';

export interface StoryWithProjectId {
  story: Story;
  projectId: string | null;
}

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss'],
  imports: [MatCardModule, MatButtonModule],
})
export class StoryListComponent implements OnInit, OnDestroy {
  private readonly storyService = inject(StoryService);
  private readonly projectService = inject(ProjectService);
  private storiesChangeSub = new Subscription();
  private currentProjectSub = new Subscription();
  stories: Story[] = [];
  currentProjectId: string | null = null;

  @Output() editRequested = new EventEmitter<StoryWithProjectId>();

  get todoStories(): Story[] {
    return this.stories.filter((story) => story.status === 'todo');
  }

  get doingStories(): Story[] {
    return this.stories.filter((story) => story.status === 'doing');
  }

  get doneStories(): Story[] {
    return this.stories.filter((story) => story.status === 'done');
  }

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
      },
    );
  }

  private async getStories(): Promise<void> {
    if (this.currentProjectId) {
      this.stories = await this.storyService
        .getStories()
        .then((stories) =>
          stories.filter((story) => story.projectId === this.currentProjectId),
        );
    } else {
      this.stories = [];
    }
  }

  deleteStory(id: string): void {
    this.storyService.deleteStory(id);
  }

  editStory(story: Story): void {
    this.editRequested.emit({ story, projectId: this.currentProjectId });
  }

  ngOnDestroy(): void {
    this.storiesChangeSub.unsubscribe();
    this.currentProjectSub.unsubscribe();
  }
}
