import { Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { ProjectDto } from '@time-tracker/model';
import { concatMap, fromEvent, tap } from 'rxjs';
import * as ProjectsActions from '../../store/projects/projects.actions';
import { SocketService } from '../socket.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectsSocketService {
  private store = inject(Store);

  constructor(private readonly socketService: SocketService) {
    this.listenForProjects();
  }

  listenForProjects() {
    console.log('listenForProjects');
    this.socketService.initDone$
      .pipe(
        takeUntilDestroyed(),
        tap(() => console.log('initDone$')),
        concatMap(() =>
          fromEvent<ProjectDto[]>(this.socketService.socket, 'projects')
        ),
        tap((projects) => {
          console.log('projects', projects);
          this.store.dispatch(ProjectsActions.setProjects({ projects }));
        })
      )
      .subscribe();
  }
}
