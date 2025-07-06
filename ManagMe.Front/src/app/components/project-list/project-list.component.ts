import { NgClass } from '@angular/common';
import {
  Component,
  Output,
  EventEmitter,
  inject,
  effect,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  imports: [MatCardModule, MatButtonModule, NgClass],
})
export class ProjectListComponent {
  private projectService = inject(ProjectService);
  private destroyRef = takeUntilDestroyed();

  @Output() editRequested = new EventEmitter<Project>();

  readonly projects = signal<Project[]>([]);
  readonly selectedProjectId = signal<string | null>(null);

  constructor() {
    this.init();
  }

  private init(): void {
    this.loadProjects();

    this.projectService.onProjectsChange
      .pipe(this.destroyRef)
      .subscribe(() => this.loadProjects());

    effect(() => {
      const current = this.projectService.currentProject.value;
      this.selectedProjectId.set(current?.id || null);
    });
  }

  private async loadProjects(): Promise<void> {
    const data = await this.projectService.getProjects();
    this.projects.set(data);
  }

  editProject(project: Project): void {
    this.editRequested.emit(project);
  }

  async deleteProject(id: string): Promise<void> {
    await this.projectService.deleteProject(id);
    await this.loadProjects();
  }

  selectProject(project: Project): void {
    this.projectService.selectCurrentProject(project);
    this.selectedProjectId.set(project.id);
  }
}
