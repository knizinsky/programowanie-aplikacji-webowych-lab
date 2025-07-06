import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Story } from '../models/story.model';
import { StorySupabaseService } from './story-supabase.service';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private readonly storySupabaseService = inject(StorySupabaseService);
  readonly onStoriesChange = new Subject<void>();
  readonly currentEditingStory = new BehaviorSubject<Story | null>(null);


  async getStories(): Promise<Story[]> {
    return this.storySupabaseService.getStories();
  }

  async saveStory(story: Story): Promise<void> {
    await this.storySupabaseService.saveStory(story);
    this.onStoriesChange.next();
  }

  async updateStory(updatedStory: Story): Promise<void> {
    await this.storySupabaseService.updateStory(updatedStory);
    this.onStoriesChange.next();
  }

  async deleteStory(storyId: string): Promise<void> {
    await this.storySupabaseService.deleteStory(storyId);
    this.onStoriesChange.next();
  }

  startEditingStory(story: Story | null): void {
    this.currentEditingStory.next(story);
  }
}
