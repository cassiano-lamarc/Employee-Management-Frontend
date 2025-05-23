import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DepartmentServiceService } from '../../../services/department-service/department-service.service';
import { DepartmentDto } from '../../../models/department/dto/department.dto';
import { SelectModule } from 'primeng/select';
import { InputMaskModule } from 'primeng/inputmask';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { EmployeeServiceService } from '../../../services/employee-service/employee-service.service';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-employee-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    SelectModule,
    InputMaskModule,
    DatePickerModule,
    ButtonModule,
    FileUploadModule,
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent implements OnInit {
  @Input() employeeId?: string | null;
  @Output() emitDialog = new EventEmitter<boolean>();

  employeeForm: FormGroup;
  departments: DepartmentDto[] = [];
  showInvalids = false;
  maxDate = new Date(Date.now());
  selectedFile?: File;

  constructor(
    private readonly employeeService: EmployeeServiceService,
    private readonly departmentService: DepartmentServiceService,
    private readonly messageService: MessageService
  ) {
    this.employeeForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl(''),
      phone: new FormControl('', [Validators.required]),
      departmentId: new FormControl('', [Validators.required]),
      hireDate: new FormControl('', [Validators.required]),
      address: new FormGroup({
        number: new FormControl(''),
        street: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
        zipCode: new FormControl(''),
      }),
    });
  }

  ngOnInit(): void {
    this.getAllDepartment();
  }

  getAllDepartment(): void {
    this.departmentService.getDepartments().subscribe({
      next: (res: DepartmentDto[]) => {
        this.departments = res;
      },
    });
  }

  onClickCancel(): void {
    this.emitDialog.emit(false);
  }

  onClickConfirm(): void {
    if (this.employeeForm.invalid) this.showInvalids = true;
    else {
      this.showInvalids = false;

      const data = this.employeeForm.value;
      this.employeeService.create(data).subscribe({
        next: (value: string) => {
          if (this.selectedFile && value) {
            const formData = new FormData();
            formData.append('file', this.selectedFile);

            this.employeeService.uploadAvatar(formData, value).subscribe({
              next: () => {
                this.emitDialog.emit(true);
              },
            });
          } else this.emitDialog.emit(true);
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
  }

  onFileSelect(event: any): void {
    const file = event.files?.[0];
    if (file) {
      this.selectedFile = file;
    }
  }
}
