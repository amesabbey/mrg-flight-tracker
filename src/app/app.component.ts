import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { SplashComponent } from './splash/splash.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SplashComponent,
    NavbarComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Flight Tracker';
  splashActive = false;

  constructor(private router: Router) {

    this.router.events.subscribe(event => this.navigationInterceptor(event));

  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: any): void {
    if (event instanceof NavigationStart) {
      this.splashActive = true;
    }
    if (event instanceof NavigationEnd) {
      this.splashActive = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.splashActive = false;
    }
    if (event instanceof NavigationError) {
      this.splashActive = false;
    }
  }
}
