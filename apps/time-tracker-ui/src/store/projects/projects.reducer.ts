import { createReducer, on } from '@ngrx/store';
import { ProjectDto } from '@time-tracker/model';
import { produce } from 'immer';
import * as ProjectsActions from './projects.actions';

export const projectsFeatureKey = 'projects';

export interface ProjectsState {
  loaded: boolean;
  projects: ProjectDto[];
}

export const initialState: ProjectsState = {
  loaded: false,
  projects: [],
};

export const projectsReducer = createReducer(
  initialState,

  on(ProjectsActions.setProjects, (state, { projects }) =>
    produce(state, (draft) => {
      draft.loaded = true;
      draft.projects = projects;
    })
  )
);
