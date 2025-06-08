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
import { inject } from '@angular/core';
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

  projectService = inject(ProjectService);

  async ngOnInit(): Promise<void> {
    await this.getProjects();
    this.subToProjectsChange();
    this.selectedProjectId =
      this.projectService.currentProject.value?.id || null;
  }

  private subToProjectsChange(): void {
    this.projectsChangeSub = this.projectService.onProjectsChange.subscribe(
      async () => {
        await this.getProjects();
      },
    );
  }

  private async getProjects(): Promise<void> {
    this.projects = await this.projectService.getProjects();
  }

  async deleteProject(id: string): Promise<void> {
    await this.projectService.deleteProject(id);
    await this.getProjects();
  }

  selectProject(project: Project): void {
    this.projectService.selectCurrentProject(project);
    this.selectedProjectId = project.id;
  }

  ngOnDestroy(): void {
    this.projectsChangeSub.unsubscribe();
  }
}
