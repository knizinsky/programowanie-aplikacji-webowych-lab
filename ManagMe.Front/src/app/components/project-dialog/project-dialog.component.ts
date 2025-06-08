import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { v4 as uuidv4 } from 'uuid';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-dialog',
  standalone: true,
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
  ],
})
export class ProjectDialogComponent implements OnInit {
  projectForm!: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project | null,
    private projectService: ProjectService,
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.data;
    this.projectForm = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      description: [this.data?.description || '', Validators.required],
    });
  }

  submit(): void {
    const project: Project = {
      id: this.data?.id || uuidv4(),
      name: this.projectForm.value.name,
      description: this.projectForm.value.description,
    };

    this.isEdit
      ? this.projectService.updateProject(project)
      : this.projectService.saveProject(project);

    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
