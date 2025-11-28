import { Observable } from 'rxjs';
import { ILoginRequest, ILoginResponse } from './auth.model';

export interface IAuthRepository {
  signIn(data: ILoginRequest): Observable<ILoginResponse>;
}
