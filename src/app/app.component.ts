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

import { filter, map, mergeMap, Observable } from 'rxjs';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from './core/services/auth-service/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    ToolbarModule,
    ButtonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LoaderComponent,
    ToastModule,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },

    MessageService,
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

  get userName(): string {
    return localStorage.getItem('userName')?.toString() ?? '';
  }

  get isLoggedIn(): Observable<boolean> {
    return this.authService.isLoggedIn$;
  }

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly titleService: Title,
    private readonly authService: AuthService
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

  onClickLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
