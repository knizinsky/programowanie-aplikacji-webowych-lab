import { Injectable } from '@angular/core';
import { supabase } from '../supabase.client';
import { Story } from '../models/story.model';

@Injectable({
  providedIn: 'root',
})
export class StorySupabaseService {
  async getStories(): Promise<Story[]> {
    const { data, error } = await supabase.from('stories').select('*');
    if (error) {
      console.error('Failed to fetch stories', error.message);
      return [];
    }
    return data.map((s: Record<string, unknown>) => this.mapStory(s));
  }

  async saveStory(story: Story): Promise<void> {
    const dbStory = this.unmapStory(story);
    const { error } = await supabase.from('stories').insert([dbStory]);
    if (error) {
      console.error('Failed to save story', error.message);
    }
  }

  async updateStory(story: Story): Promise<void> {
    const dbStory = this.unmapStory(story);
    const { error } = await supabase
      .from('stories')
      .update(dbStory)
      .eq('id', story.id);
    if (error) {
      console.error('Failed to update story', error.message);
    }
  }

  async deleteStory(storyId: string): Promise<void> {
    const { error } = await supabase.from('stories').delete().eq('id', storyId);
    if (error) {
      console.error('Failed to delete story', error.message);
    }
  }

  private mapStory(dbStory: Record<string, unknown>): Story {
    return {
      id: dbStory['id'] as string,
      name: dbStory['name'] as string,
      description: dbStory['description'] as string,
      priority: dbStory['priority'] as 'low' | 'medium' | 'high',
      projectId: dbStory['project_id'] as string | undefined,
      createdAt: new Date(dbStory['created_at'] as string),
      status: dbStory['status'] as 'todo' | 'doing' | 'done',
      ownerId: dbStory['owner_id'] as string | undefined,
    };
  }

  private unmapStory(story: Story): Record<string, any> {
    return {
      id: story.id,
      name: story.name,
      description: story.description,
      priority: story.priority,
      project_id: story.projectId,
      created_at: story.createdAt.toISOString(),
      status: story.status,
      owner_id: story.ownerId,
    };
  }
}
