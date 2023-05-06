import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProjectsSocketService } from '../socket/projects/projects-socket.service';
import * as AuthActions from '../store/auth/auth.actions';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'time-tracker-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private store = inject(Store);
  private socket = inject(ProjectsSocketService);

  ngOnInit() {
    console.log('App component initialized');
    // Try to refresh the token on app load, if the page is not the login success page
    if (!window.location.href.includes('login/success')) {
      this.store.dispatch(AuthActions.refreshToken());
    }
  }
}
