import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit, OnDestroy {
  private projectsChangeSub = new Subscription();
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getProjects();
    this.subToProjectsChange();
  }

  private subToProjectsChange(): void {
    this.projectsChangeSub = this.projectService.onProjectsChange.subscribe(
      () => {
        this.getProjects();
      }
    );
  }

  private getProjects(): void {
    this.projects = this.projectService.getProjects();
  }

  deleteProject(id: string): void {
    this.projectService.deleteProject(id);
    this.projects = this.projectService.getProjects();
  }

  editProject(project: Project): void {
    this.projectService.startEditingProject(project);
  }

  selectProject(project: Project): void {
    this.projectService.selectCurrentProject(project);
  }

  ngOnDestroy(): void {
    this.projectsChangeSub.unsubscribe();
  }
}
