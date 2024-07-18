import { Component } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from '../error/error.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FlightSubmissionComponent } from '../flight-submission/flight-submission.component';
import { FlightListComponent } from "../flight-list/flight-list.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    FlightListComponent
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  activeUser: boolean = false;
  refresh: boolean = false;

  constructor(
    public auth: Auth, 
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}
  
  loginWithGoogle() {
    signInWithPopup(this.auth, new GoogleAuthProvider())
    .then((value) => {
      console.log(value);
      this.activeUser = true;
    })
    .catch((error) => {
      console.log(error);
      this.displayError(error);
    });
  }

  logout() {
    this.auth.signOut();
    this.activeUser = false;
  }

  openAddFlightDialog() {
    const dialogRef = this.dialog.open(FlightSubmissionComponent, { width: '600px' });

    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result) {
            this._snackBar.open('Flight successfully added!', 'Close', {duration: 5000, verticalPosition: 'bottom'});
            this.refresh = !this.refresh;
        }
      },
      error: error => this.displayError(error)
    });
  }

  displayError(error: any) {
    this.dialog.open(ErrorComponent, { width: '500px', data: { message: error } });
  }
  
}
