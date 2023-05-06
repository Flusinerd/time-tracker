import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import * as AuthActions from '../../store/auth/auth.actions';
import { Store } from '@ngrx/store';

type UserData = {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
};

@Component({
  selector: 'time-tracker-login-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-success.component.html',
  styleUrls: ['./login-success.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginSuccessComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);
  private userData = this.route.snapshot.queryParamMap.get('user');

  ngOnInit(): void {
    if (!this.userData) {
      return;
    }
    try {
      // Decode the uri encoded base64 string
      const userDataDecoded: UserData = JSON.parse(
        decodeURIComponent(window.atob(this.userData))
      ) as UserData;
      const { firstName, lastName, email, picture } = userDataDecoded;
      this.store.dispatch(
        AuthActions.loginUser({
          firstName,
          lastName,
          email,
          picture,
        })
      );
      this.router.navigate(['/']);
    } catch (error) {
      console.error(error);
    }
  }
}
