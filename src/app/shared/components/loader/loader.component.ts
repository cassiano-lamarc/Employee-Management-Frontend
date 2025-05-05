import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoaderService } from '../../../core/services/loader-service/loader.service';

@Component({
  selector: 'app-loader',
  imports: [CommonModule, ProgressSpinnerModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  constructor(public loaderService: LoaderService) {}
}
