import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginRequest, ILoginResponse } from '../domain/auth.model';
import { AuthApplicationService } from '../application/auth.application.service';

@Injectable({
  providedIn: 'root',
})
export class AuthControllerService {
  private application = inject(AuthApplicationService);

  signIn(data: ILoginRequest): Observable<ILoginResponse> {
    return this.application.signIn(data);
  }
}
