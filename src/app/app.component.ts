import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { filter, map, mergeMap } from 'rxjs';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

import { AuthInterceptor } from './core/interceptors/auth.interceptor';

@Component({
  selector: 'app-root',
  imports: [
    ToolbarModule,
    ButtonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AppComponent {
  title = 'softwaremind-frontend-employee-manager';
  faetures = [
    {
      buttonText: 'Employee',
      routeUrl: '/employees',
    },
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        const title = data['title'];
        if (title) {
          this.titleService.setTitle(title);
        }
      });
  }
}
