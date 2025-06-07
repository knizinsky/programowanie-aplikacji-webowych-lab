import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Story } from '../models/story.model';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private readonly storageKey = 'stories';
  readonly onStoriesChange = new Subject<void>();
  readonly currentEditingStory = new BehaviorSubject<Story | null>(null);

  getStories(): Story[] {
    const stories = localStorage.getItem(this.storageKey);
    return stories ? JSON.parse(stories) : [];
  }

  saveStory(story: Story): void {
    const stories = this.getStories();
    stories.push(story);
    localStorage.setItem(this.storageKey, JSON.stringify(stories));
    this.onStoriesChange.next();
  }

  updateStory(updatedStory: Story): void {
    const stories = this.getStories();
    const index = stories.findIndex((s) => s.id === updatedStory.id);
    if (index !== -1) {
      stories[index] = updatedStory;
      localStorage.setItem(this.storageKey, JSON.stringify(stories));
    }
    this.onStoriesChange.next();
  }

  deleteStory(storyId: string): void {
    let stories = this.getStories();
    stories = stories.filter((s) => s.id !== storyId);
    localStorage.setItem(this.storageKey, JSON.stringify(stories));
    this.onStoriesChange.next();
  }

  startEditingStory(story: Story | null): void {
    this.currentEditingStory.next(story);
  }
}
