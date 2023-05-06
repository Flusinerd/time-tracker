import { Route } from '@angular/router';
import { isLoggedInGuard } from '../common/guards/is-logged-in.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    canActivate: [isLoggedInGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'login/success',
    loadComponent: () =>
      import('./login-success/login-success.component').then(
        (m) => m.LoginSuccessComponent
      ),
  },
  {
    path: 'login/failure',
    loadComponent: () =>
      import('./login-failure/login-failure.component').then(
        (m) => m.LoginFailureComponent
      ),
  },
  {
    path: 'projects',
    canActivate: [isLoggedInGuard],
    loadComponent: () =>
      import('./projects/projects.component').then((m) => m.ProjectsComponent),
  },
];
