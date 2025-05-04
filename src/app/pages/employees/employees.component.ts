import { Component } from '@angular/core';

import { CardModule } from 'primeng/card';
import { EmployeesDTO } from '../../models/employee/dtos/employees.dto';

@Component({
  selector: 'app-employees',
  imports: [CardModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent {
  employees: EmployeesDTO[] = [];
}
