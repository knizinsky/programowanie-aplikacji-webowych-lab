import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Subscription } from 'rxjs';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  imports: [MatCardModule, MatButtonModule, NgClass],
})
export class ProjectListComponent implements OnInit, OnDestroy {
  private projectsChangeSub = new Subscription();
  projects: Project[] = [];
  selectedProjectId: string | null = null;

  @Output() editRequested = new EventEmitter<Project>();

  editProject(project: Project): void {
    this.editRequested.emit(project);
  }

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getProjects();
    this.subToProjectsChange();
    this.selectedProjectId =
      this.projectService.currentProject.value?.id || null;
  }

  private subToProjectsChange(): void {
    this.projectsChangeSub = this.projectService.onProjectsChange.subscribe(
      () => {
        this.getProjects();
      },
    );
  }

  private getProjects(): void {
    this.projects = this.projectService.getProjects();
  }

  deleteProject(id: string): void {
    this.projectService.deleteProject(id);
    this.projects = this.projectService.getProjects();
  }

  selectProject(project: Project): void {
    this.projectService.selectCurrentProject(project);
    this.selectedProjectId = project.id;
  }

  ngOnDestroy(): void {
    this.projectsChangeSub.unsubscribe();
  }
}
