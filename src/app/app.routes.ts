import { Routes } from '@angular/router';
import { EmployeesComponent } from './pages/employees/employees.component';
import { EmployeeDetailsComponent } from './pages/employees/employee-details/employee-details.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

export const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [AuthGuard],
    data: { title: 'Manage Employee', subtitle: 'Employee List' },
  },
  {
    path: 'employees/:id',
    component: EmployeeDetailsComponent,
    canActivate: [AuthGuard],
    data: { title: 'Employee', subtitle: 'Employee Details' },
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '**', component: NotfoundComponent },
];
