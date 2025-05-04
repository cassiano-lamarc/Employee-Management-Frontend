export interface EmployeesDTO {
  id: string;
  firstName: string;
  lastName?: string;
  fullName?: string;
  departmentId?: string;
  department?: string;
  hireDate?: Date;
}
