import { Component } from '@angular/core';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { EmployeesDTO } from '../../models/employee/dtos/employees.dto';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

@Component({
  selector: 'app-employees',
  imports: [CardModule, ButtonModule, DialogModule, EmployeeFormComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent {
  employees: EmployeesDTO[] = [];
  dialogFormVisible = false;
  selectedEmployeeId: string | null = null;

  constructor() {}

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
}
