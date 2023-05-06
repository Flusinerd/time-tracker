import { ActionReducerMap } from '@ngrx/store';
import { AuthState, authReducer } from './auth/auth.reducer';
import { ProjectsState, projectsReducer } from './projects/projects.reducer';

export interface AppState {
  auth: AuthState;
  projects: ProjectsState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  projects: projectsReducer,
};
