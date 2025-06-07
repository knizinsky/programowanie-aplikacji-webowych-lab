import { Component } from '@angular/core';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { StoryListComponent } from './components/story-list/story-list.component';
import { StoryFormComponent } from './components/story-form/story-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, NgModel } from '@angular/forms';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [
    ProjectFormComponent,
    ProjectListComponent,
    StoryListComponent,
    UserListComponent,
    TaskFormComponent,
    KanbanBoardComponent,
    FormsModule,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'MyApp';
  password: string = '';
  loginValue: string = '';

  constructor(private readonly authService: AuthService) {}

  login() {
    this.authService.login(this.loginValue, this.password).subscribe({
      next: () => console.log('Zalogowano!'),
      error: (err) => console.error('Błąd logowania', err),
    });
  }
}
