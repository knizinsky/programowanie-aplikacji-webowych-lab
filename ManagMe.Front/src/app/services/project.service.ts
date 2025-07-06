import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Project } from '../models/project.model';
import { ProjectSupabaseService } from './project-supabase.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly projectSupabaseService = inject(ProjectSupabaseService);
  readonly onProjectsChange = new Subject<void>();
  readonly currentEditingProject = new BehaviorSubject<Project | null>(null);
  readonly currentProject = new BehaviorSubject<Project | null>(null);


  async getProjects(): Promise<Project[]> {
    return this.projectSupabaseService.getProjects();
  }

  async saveProject(project: Project): Promise<void> {
    await this.projectSupabaseService.saveProject(project);
    this.onProjectsChange.next();
  }

  async updateProject(updatedProject: Project): Promise<void> {
    await this.projectSupabaseService.updateProject(updatedProject);
    this.onProjectsChange.next();
    this.currentEditingProject.next(null);
  }

  async deleteProject(projectId: string): Promise<void> {
    await this.projectSupabaseService.deleteProject(projectId);
    this.onProjectsChange.next();
  }

  startEditingProject(project: Project): void {
    this.currentEditingProject.next(project);
  }

  selectCurrentProject(project: Project): void {
    this.currentProject.next(project);
  }
}
