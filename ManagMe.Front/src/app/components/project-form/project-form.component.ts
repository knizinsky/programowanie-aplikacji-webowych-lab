import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class ProjectFormComponent implements OnInit, OnDestroy {
  private editingProjectSub = new Subscription();
  projectForm: FormGroup;
  projectToEdit!: Project | null;
  private cancelEdit = false;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
  ) {
    this.projectForm = this.fb.group({
      name: '',
      description: '',
    });
  }

  ngOnInit(): void {
    this.editingProjectSub =
      this.projectService.currentEditingProject.subscribe((proj) => {
        this.projectToEdit = proj;

        console.log(this.cancelEdit);
        if (this.projectToEdit && !this.cancelEdit) {
          this.projectForm.patchValue(this.projectToEdit);
        }
      });
  }

  saveProject(): void {
    const project: Project = {
      id: this.projectToEdit ? this.projectToEdit.id : uuidv4(),
      name: this.projectForm.value.name,
      description: this.projectForm.value.description,
    };

    if (this.projectToEdit) {
      this.projectService.updateProject(project);
    } else {
      this.projectService.saveProject(project);
    }

    this.resetProjectForm();
  }

  resetProjectForm(cancelEdit = false): void {
    this.projectForm.reset();
    this.cancelEdit = cancelEdit;
  }

  ngOnDestroy(): void {
    this.editingProjectSub.unsubscribe();
  }
}
