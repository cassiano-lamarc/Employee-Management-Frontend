import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentDto } from '../../models/department/dto/department.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DepartmentServiceService {
  constructor(private readonly http: HttpClient) {}

  getDepartments(): Observable<DepartmentDto[]> {
    return this.http.get<DepartmentDto[]>(`${environment.baseUrl}Department`);
  }
}
