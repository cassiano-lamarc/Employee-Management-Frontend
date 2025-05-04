import { Component, OnInit } from '@angular/core';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { EmployeesDTO } from '../../models/employee/dtos/employees.dto';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeServiceService } from '../../services/employee-service/employee-service.service';
import { FormatDatePipe } from '../../pipes/format-date.pipe';

@Component({
  selector: 'app-employees',
  imports: [
    CardModule,
    ButtonModule,
    DialogModule,
    EmployeeFormComponent,
    FormatDatePipe,
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent implements OnInit {
  employees: EmployeesDTO[] = [];
  dialogFormVisible = false;
  selectedEmployeeId: string | null = null;

  constructor(private readonly employeeService: EmployeeServiceService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  showDialog(selectedEmployeeId: string | null): void {
    this.selectedEmployeeId = selectedEmployeeId;
    this.dialogFormVisible = true;
  }

  closeDialog(): void {
    this.dialogFormVisible = false;
  }

  emitDialog($event: boolean): void {
    this.closeDialog();
  }

  getEmployees(): void {
    this.employeeService.getAll().subscribe({
      next: (value) => {
        this.employees = value;
      },
    });
  }
}
