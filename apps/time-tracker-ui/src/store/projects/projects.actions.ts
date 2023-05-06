import { createAction, props } from '@ngrx/store';
import {
  CreateProjectDto,
  ProjectDto,
  UpdateProjectDto,
} from '@time-tracker/model';

export const setProjects = createAction(
  '[Projects] Set Projects',
  props<{ projects: ProjectDto[] }>()
);

export const createProject = createAction(
  '[Projects] Create Project',
  props<{ project: CreateProjectDto }>()
);

export const createProjectSuccess = createAction(
  '[Projects] Create Project Success',
  props<{ project: ProjectDto }>()
);

export const createProjectFailure = createAction(
  '[Projects] Create Project Failure',
  props<{ error: unknown }>()
);

export const updateProject = createAction(
  '[Projects] Update Project',
  props<{ project: UpdateProjectDto }>()
);

export const updateProjectSuccess = createAction(
  '[Projects] Update Project Success',
  props<{ project: ProjectDto }>()
);

export const updateProjectFailure = createAction(
  '[Projects] Update Project Failure',
  props<{ error: unknown }>()
);
