import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Project } from '@prisma/client';
import { ProjectDto } from '@time-tracker/model';
import { filter, tap } from 'rxjs';
import * as fromProjects from '../../store/projects/projects.selectors';
import { SidebarComponent } from '../sidebar/sidebar.component';
import {
  ProjectFormComponent,
  ProjectFormComponentData,
} from './project-form/project-form.component';

@Component({
  selector: 'time-tracker-projects',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent implements OnInit {
  private store = inject(Store);
  private changeDectorRef = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private dialog = inject(MatDialog);

  public displayedColumns: string[] = ['name', 'actions'];
  public dataSource = new MatTableDataSource<Project>([]);
  public loading$ = this.store.select(fromProjects.selectProjectsLoading);

  ngOnInit(): void {
    this.store
      .select(fromProjects.selectProjects)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((projects) => {
          this.dataSource.data = projects;
          this.changeDectorRef.markForCheck();
        })
      )
      .subscribe();
  }

  public onUpdate(project: ProjectDto) {
    const dialogRef = this.dialog.open(ProjectFormComponent, {
      data: {
        title: 'Edit Project',
        project,
      } as ProjectFormComponentData,
    });

    dialogRef.afterClosed().pipe(filter(Boolean), tap(console.log)).subscribe();
  }

  public onDelete(project: ProjectDto) {}
}
