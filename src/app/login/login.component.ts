import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from '../error/error.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  activeUser: boolean = false;

  constructor(public auth: Auth, public router: Router, public dialog: MatDialog) {}
  
  loginWithGoogle() {
    signInWithPopup(this.auth, new GoogleAuthProvider())
    .then((value) => {
      console.log(value);
      this.activeUser = true;
      this.router.navigate(['/view-flights']);
    })
    .catch((error) => {
      console.log(error);
      this.displayError(error);
    });
  }

  logout() {
    this.auth.signOut();
  }

  displayError(error: any) {
    this.dialog.open(ErrorComponent, { width: '500px', data: { message: error } });
  }

}
