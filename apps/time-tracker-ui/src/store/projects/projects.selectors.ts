import { AppState } from '..';

export const selectProjects = (state: AppState) => state.projects.projects;
export const selectProjectsLoading = (state: AppState) => state.projects.loaded;
