import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { LoginModel } from '../../core/models/login.model';
import { LoginResponse } from '../../core/models/login.response';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  constructor(private readonly http: HttpClient) {}

  authLogin(loginData: LoginModel): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.baseUrl}Auth/login`, loginData);
  }
}
