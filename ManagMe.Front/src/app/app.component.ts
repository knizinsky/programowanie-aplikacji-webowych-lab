import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ProjectDialogComponent } from './components/project-dialog/project-dialog.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { StoryDialogComponent } from './components/story-dialog/story-dialog.component';
import {
  StoryListComponent,
  StoryWithProjectId,
} from './components/story-list/story-list.component';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { Project } from './models/project.model';
import { Task } from './models/task.model';
import { AuthService } from './services/auth.service';
import { ThemeService } from './services/theme.service';

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
    private readonly themeService: ThemeService,
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
