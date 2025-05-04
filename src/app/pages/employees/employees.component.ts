import { Component } from '@angular/core';

import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-employees',
  imports: [CardModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {

}
