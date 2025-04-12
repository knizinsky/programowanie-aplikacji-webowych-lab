import { Component } from '@angular/core';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { StoryListComponent } from './components/story-list/story-list.component';
import { StoryFormComponent } from './components/story-form/story-form.component';
import { UserListComponent } from './components/user-list/user-list.component';

@Component({
  selector: 'app-root',
  imports: [
    ProjectFormComponent,
    ProjectListComponent,
    StoryListComponent,
    UserListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'MyApp';
}
