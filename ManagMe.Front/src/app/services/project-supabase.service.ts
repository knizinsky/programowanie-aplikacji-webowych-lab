import { Injectable } from '@angular/core';
import { supabase } from '../supabase.client';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectSupabaseService {
  async getProjects(): Promise<Project[]> {
    const { data, error } = await supabase.from('projects').select('*');
    if (error) {
      console.error('Failed to fetch projects', error.message);
      return [];
    }
    return data.map((p: Record<string, unknown>) => this.mapProject(p));
  }

  async saveProject(project: Project): Promise<void> {
    const { error } = await supabase.from('projects').insert([project]);
    if (error) {
      console.error('Failed to save project', error.message);
    }
  }

  async updateProject(project: Project): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .update(project)
      .eq('id', project.id);
    if (error) {
      console.error('Failed to update project', error.message);
    }
  }

  async deleteProject(projectId: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);
    if (error) {
      console.error('Failed to delete project', error.message);
    }
  }

  private mapProject(dbProject: Record<string, unknown>): Project {
    return {
      id: dbProject['id'] as string,
      name: dbProject['name'] as string,
      description: dbProject['description'] as string,
    };
  }
}
