import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SignInForm } from '../../components/sign-in-form/sign-in-form';

@Component({
  selector: 'app-sign-in-page',
  imports: [SignInForm],
  template: `<app-sign-in-form></app-sign-in-form>`,
  styleUrl: './sign-in-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInPage {}
