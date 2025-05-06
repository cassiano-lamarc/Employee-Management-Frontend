import { DepartmentDto } from '../../department/dto/department.dto';
import { AddressDto } from './address.dto';

export interface EmployeesDTO {
  id: string;
  firstName: string;
  lastName?: string;
  deparmentId?: string;
  hireDate?: Date;
  avatarUrl: string;
  number: number;
  phone: string;

  departmentDescription: string;
  createdUserName: string;
  updatedUserName: string;

  addresss: AddressDto;
}
