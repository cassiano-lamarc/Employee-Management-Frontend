import { Component, OnInit } from '@angular/core';
import { EmployeesDTO } from '../../../models/employee/dtos/employees.dto';
import { EmployeeServiceService } from '../../../services/employee-service/employee-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatDatePipe } from '../../../pipes/format-date.pipe';
import { SelectModule } from 'primeng/select';
import { DepartmentServiceService } from '../../../services/department-service/department-service.service';
import { DepartmentDto } from '../../../models/department/dto/department.dto';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { forkJoin } from 'rxjs';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-employee-details',
  imports: [
    FormatDatePipe,
    SelectModule,
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
})
export class EmployeeDetailsComponent implements OnInit {
  employeeId = '';
  employee?: EmployeesDTO;
  departments: DepartmentDto[] = [];
  departmentForm: FormGroup;

  get departmentId(): string {
    return this.getFormControl('departmentId');
  }

  constructor(
    private readonly employeeService: EmployeeServiceService,
    private readonly route: ActivatedRoute,
    private readonly departmentService: DepartmentServiceService,
    private messageService: MessageService,
    private readonly router: Router
  ) {
    this.departmentForm = new FormGroup({
      departmentId: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.employeeId = params.get('id')!;

      this.getEmployeeDetails();
    });
  }

  getEmployeeDetails(): void {
    forkJoin({
      employee: this.employeeService.getById(this.employeeId),
      departments: this.departmentService.getDepartments(),
    }).subscribe(({ employee, departments }) => {
      this.employee = employee;
      this.departments = departments;

      this.departmentForm.get('departmentId')?.setValue(employee.deparmentId);
    });
  }

  onClickConfirm(): void {
    this.employeeService
      ?.updateDepartment(this.employeeId, this.departmentId)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Record updated successfully',
            life: 3000,
          });

          this.getEmployeeDetails();
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error?.error?.title ?? 'Try again!',
              life: 3000,
            });
          }
        },
      });
  }

  getFormControl(formControl: string): string {
    return this.departmentForm?.get(formControl)?.value;
  }

  onClickBack(): void {
    this.router.navigate(['/employees']);
  }
}
