import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FlightSubmissionComponent } from './flight-submission/flight-submission.component';
import { FlightListComponent } from './flight-list/flight-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'add-flight', component: FlightSubmissionComponent },
    { path: 'view-flights', component: FlightListComponent }
];
