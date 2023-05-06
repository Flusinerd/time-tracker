import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProjectDto } from '@time-tracker/model';

export type ProjectFormComponentData = {
  title?: string;
  project?: ProjectDto;
};

@Component({
  selector: 'time-tracker-project-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFormComponent implements OnInit {
  private data?: ProjectFormComponentData = inject(MAT_DIALOG_DATA, {
    optional: true,
  });

  public readonly form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
  });

  public title = 'Edit Project';

  ngOnInit(): void {
    if (!this.data) {
      return;
    }

    if (this.data.project) {
      this.form.patchValue(this.data.project);
    }

    if (this.data.title) {
      this.title = this.data.title;
    }
  }
}
