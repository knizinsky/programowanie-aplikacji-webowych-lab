import { Component, OnInit } from '@angular/core';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { StoryListComponent } from './components/story-list/story-list.component';
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
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  imports: [
    MatTabsModule,
    MatButtonModule,
    LoginFormComponent,
    ProjectFormComponent,
    ProjectListComponent,
    StoryListComponent,
    UserListComponent,
    TaskFormComponent,
    KanbanBoardComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'MyApp';
  isLoggedIn = false;

  constructor(private auth: AuthService) {}

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
}
