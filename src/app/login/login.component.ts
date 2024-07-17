import { Component } from '@angular/core';
import { GoogleAuthProvider, signInWithRedirect } from '@angular/fire/auth';
import { getAuth } from "firebase/auth";
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(public dialog: MatDialog) {}
  
  loginWithGoogle() {
    try {
      signInWithRedirect(getAuth(), new GoogleAuthProvider());
    } catch (error) {
      this.displayError(error);
    }
  }

  displayError(error: any) {
    this.dialog.open(ErrorComponent, { width: '500px', data: { message: error } });
  }
}
