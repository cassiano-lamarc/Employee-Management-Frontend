import { DepartmentDto } from '../../department/dto/department.dto';

export interface EmployeesDTO {
  id: string;
  firstName: string;
  lastName?: string;
  departmentId?: string;
  department?: string;
  hireDate?: Date;
  avatarUrl: string;

  deparment: DepartmentDto;
}
