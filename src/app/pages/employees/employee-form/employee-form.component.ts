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

@Component({
  selector: 'app-employee-form',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    SelectModule,
    InputMaskModule,
    DatePickerModule,
    ButtonModule,
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent implements OnInit {
  @Input() employeeId?: string | null;
  @Output() emitDialog = new EventEmitter<boolean>();

  employeeForm: FormGroup;
  departments: DepartmentDto[] = [];

  constructor(private readonly departmentService: DepartmentServiceService) {
    this.employeeForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl(''),
      phone: new FormControl(''),
      departmentId: new FormControl('', [Validators.required]),
      hireDate: new FormControl('', [Validators.required]),
      number: new FormControl(''),
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zipCode: new FormControl(''),
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

  onClickConfirm(): void {}
}
