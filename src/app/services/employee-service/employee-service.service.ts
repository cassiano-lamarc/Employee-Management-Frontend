import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EmployeesDTO } from '../../models/employee/dtos/employees.dto';

@Injectable({
  providedIn: 'root',
})
export class EmployeeServiceService {
  baseApiUrl: string = `${environment.baseUrl}Employee`;

  constructor(private readonly httpClient: HttpClient) {}

  create(data: any): Observable<object> {
    return this.httpClient.post<Observable<object>>(this.baseApiUrl, data);
  }

  getAll(): Observable<EmployeesDTO[]> {
    return this.httpClient.get<EmployeesDTO[]>(this.baseApiUrl);
  }

  delete(id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.baseApiUrl}/${id}`);
  }
}
