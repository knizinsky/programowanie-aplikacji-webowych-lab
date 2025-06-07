import { Component, OnInit } from '@angular/core';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import {
  StoryListComponent,
  StoryWithProjectId,
} from './components/story-list/story-list.component';
import { StoryFormComponent } from './components/story-form/story-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { ProjectDialogComponent } from './components/project-dialog/project-dialog.component';
import { Project } from './models/project.model';
import { Task } from './models/task.model';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { StoryDialogComponent } from './components/story-dialog/story-dialog.component';
import { Story } from './models/story.model';
import { ThemeService } from './services/theme.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-root',
  imports: [
    MatTabsModule,
    MatButtonModule,
    LoginFormComponent,
    ProjectListComponent,
    StoryListComponent,
    UserListComponent,
    KanbanBoardComponent,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(
    private readonly auth: AuthService,
    private readonly dialog: MatDialog,
    private readonly themeService: ThemeService
  ) {}

  get isDarkTheme(): boolean {
    return this.themeService.isDarkTheme;
  }

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedIn();
  }

  handleLogin() {
    this.isLoggedIn = true;
  }

  logout() {
    this.auth.logout();
    this.isLoggedIn = false;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  openProjectDialog(project: Project | null = null): void {
    this.dialog.open(ProjectDialogComponent, {
      data: project,
      width: '400px',
      disableClose: true,
    });
  }

  openTaskDialog(task: Task | null = null): void {
    this.dialog.open(TaskDialogComponent, {
      data: { task },
      width: '500px',
      disableClose: true,
    });
  }

  openStoryDialog(storyWithProjectId?: StoryWithProjectId): void {
    const { story, projectId } = storyWithProjectId ?? {};
    if (!projectId && storyWithProjectId) return;

    this.dialog.open(StoryDialogComponent, {
      data: { story, projectId },
      width: '500px',
      disableClose: true,
    });
  }
}
