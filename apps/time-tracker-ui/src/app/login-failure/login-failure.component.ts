import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'time-tracker-login-failure',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-failure.component.html',
  styleUrls: ['./login-failure.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFailureComponent {}
