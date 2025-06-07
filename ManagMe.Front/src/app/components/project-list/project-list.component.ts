import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  imports: [MatCardModule, MatButtonModule],
})
export class ProjectListComponent implements OnInit, OnDestroy {
  private projectsChangeSub = new Subscription();
  projects: Project[] = [];

  @Output() editRequested = new EventEmitter<Project>();

  editProject(project: Project): void {
    this.editRequested.emit(project);
  }

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

  // editProject(project: Project): void {
  //   this.projectService.startEditingProject(project);
  // }

  selectProject(project: Project): void {
    this.projectService.selectCurrentProject(project);
  }

  ngOnDestroy(): void {
    this.projectsChangeSub.unsubscribe();
  }
}
