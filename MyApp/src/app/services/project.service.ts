import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly storageKey = 'projects';
  private readonly currentProjectKey = 'currentProject';
  readonly onProjectsChange = new Subject<void>();
  readonly currentEditingProject = new BehaviorSubject<Project | null>(null);
  readonly currentProject = new BehaviorSubject<Project | null>(null);

  constructor() {
    const savedProject = localStorage.getItem(this.currentProjectKey);
    if (savedProject) {
      this.currentProject.next(JSON.parse(savedProject));
    }
  }

  getProjects(): Project[] {
    const projects = localStorage.getItem(this.storageKey);
    return projects ? JSON.parse(projects) : [];
  }

  saveProject(project: Project): void {
    const projects = this.getProjects();
    projects.push(project);
    localStorage.setItem(this.storageKey, JSON.stringify(projects));
    this.onProjectsChange.next();
  }

  updateProject(updatedProject: Project): void {
    const projects = this.getProjects();
    const index = projects.findIndex((p) => p.id === updatedProject.id);
    if (index !== -1) {
      projects[index] = updatedProject;
      localStorage.setItem(this.storageKey, JSON.stringify(projects));
    }
    this.onProjectsChange.next();
    this.currentEditingProject.next(null);
  }

  deleteProject(projectId: string): void {
    let projects = this.getProjects();
    projects = projects.filter((p) => p.id !== projectId);
    localStorage.setItem(this.storageKey, JSON.stringify(projects));
    this.onProjectsChange.next();
  }

  startEditingProject(project: Project): void {
    this.currentEditingProject.next(project);
  }

  selectCurrentProject(project: Project): void {
    this.currentProject.next(project);
    localStorage.setItem(this.currentProjectKey, JSON.stringify(project));
  }
}
