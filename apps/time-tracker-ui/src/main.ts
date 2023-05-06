import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { AuthInterceptor } from './common/interceptors/auth.interceptor';
import { ProjectsSocketService } from './socket/projects/projects-socket.service';
import { reducers } from './store';
import { AuthEffects } from './store/auth/auth.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideAnimations(),
    provideStore(reducers),
    provideEffects([AuthEffects]),
    provideStoreDevtools({
      name: 'Time Tracker',
      maxAge: 25,
      trace: true,
      traceLimit: 75,
    }),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    ProjectsSocketService,
  ],
}).catch((err) => console.error(err));
