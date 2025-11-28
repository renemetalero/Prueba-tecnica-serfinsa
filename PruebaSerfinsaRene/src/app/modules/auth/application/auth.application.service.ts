import { inject, Injectable } from '@angular/core';
import { ILoginRequest, ILoginResponse } from '../domain/auth.model';
import { Observable } from 'rxjs';
import { IAuthRepository } from '../domain/auth.repository';
import { AuthInfraestructureService } from '../infraestructure/auth.infraestructure.service';

@Injectable({
  providedIn: 'root',
})
export class AuthApplicationService {
  repository = inject<IAuthRepository>(AuthInfraestructureService);

  signIn(data: ILoginRequest): Observable<ILoginResponse> {
    return this.repository.signIn(data);
  }
}
