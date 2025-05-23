import { Component, OnInit } from '@angular/core';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { EmployeesDTO } from '../../models/employee/dtos/employees.dto';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeServiceService } from '../../services/employee-service/employee-service.service';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-employees',
  imports: [
    CardModule,
    ButtonModule,
    DialogModule,
    EmployeeFormComponent,
    FormatDatePipe,
    ConfirmDialogModule,
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
  providers: [ConfirmationService],
})
export class EmployeesComponent implements OnInit {
  employees: EmployeesDTO[] = [];
  dialogFormVisible = false;
  selectedEmployeeId: string | null = null;

  constructor(
    private readonly employeeService: EmployeeServiceService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly router: Router
  ) {}

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

    if ($event) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Record created successfully',
      });

      setTimeout(() => {
        this.getEmployees();
      }, 999);
    }
  }

  getEmployees(): void {
    this.employeeService.getAll().subscribe({
      next: (value) => {
        this.employees = value;
      },
    });
  }

  confirmDeletion(event: Event, selectedEmployeeId: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: () => {
        this.deleteEmployee(selectedEmployeeId);
      },
      reject: () => {},
    });
  }

  deleteEmployee(selectedEmployeeId: string): void {
    this.employeeService.delete(selectedEmployeeId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmed',
          detail: 'Record deleted',
        });

        this.getEmployees();
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 400){
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error?.error?.title ?? 'Try again!',
            life: 3000,
          });
        }
      }
    });
  }

  viewDetails(employeeId: string): void {
    this.router.navigate([`/employees/${employeeId}`]);
  }
}
