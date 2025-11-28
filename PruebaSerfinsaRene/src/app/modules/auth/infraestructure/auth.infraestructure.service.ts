import { inject, Injectable } from '@angular/core';
import { IAuthRepository } from '../domain/auth.repository';
import { ILoginRequest, ILoginResponse } from '../domain/auth.model';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthInfraestructureService implements IAuthRepository {
  http = inject(HttpClient);

  signIn(data: ILoginRequest): Observable<ILoginResponse> {
    return this.http
      .post<ILoginResponse>(`${environment.BASE_URL}/auth/login`, data)
      
  }
}
