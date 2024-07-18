import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';
import { Flight } from '../models/flight';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SplashComponent } from '../splash/splash.component';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../error/error.component';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-flight-submission',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    SplashComponent
  ],
  templateUrl: './flight-submission.component.html',
  styleUrl: './flight-submission.component.scss'
})
export class FlightSubmissionComponent {
  splashActive = false;

  airlineControl = new FormControl();
  arrivalDateControl = new FormControl();
  arrivalTimeControl = new FormControl();
  flightNumberControl = new FormControl();
  numOfGuestsControl = new FormControl();
  commentsControl = new FormControl();

  formGroup = this.formBuilder.group({
    airlineControl: this.airlineControl,
    arrivalDateControl: this.arrivalDateControl,
    arrivalTimeControl: this.arrivalTimeControl,
    flightNumberControl: this.flightNumberControl,
    numOfGuestsControl: this.numOfGuestsControl,
    commentsControl: this.commentsControl,
  });

  constructor(
    private formBuilder: FormBuilder, 
    private afAuth: Auth, 
    private http: HttpClient, 
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FlightSubmissionComponent> ) { }
  
  clearForm() {
    this.airlineControl.reset();
    this.arrivalDateControl.reset();
    this.arrivalTimeControl.reset();
    this.flightNumberControl.reset();
    this.numOfGuestsControl.reset();
    this.commentsControl.reset();
  }

  createFlightObject() {
    // Start loading spinner
    this.splashActive = true;

    const email = this.afAuth.currentUser?.email;

    if (!email) {
      this.displayError('User is not logged in');
      return;
    }

    const flight: Flight = {
      user: email,
      airline: this.airlineControl.value,
      arrivalDate: this.arrivalDateControl.value,
      arrivalTime: this.arrivalTimeControl.value,
      flightNumber: this.flightNumberControl.value,
      numOfGuests: this.numOfGuestsControl.value,
      comments: this.commentsControl.value
    };
    
    
    this.addFlightToDatabase(flight);
    this.sendFlightInfoPayload();
  }

  addFlightToDatabase(flight: Flight) {
    this.http.post('https://mrg-flight-tracker-app-default-rtdb.firebaseio.com/flights.json', flight)
    .subscribe({
      next: responseData => console.log('Successfully passed flight to Firebase, ', responseData),
      error: error => this.displayError(error)      
    });
  }

  sendFlightInfoPayload() {
    const token = 'WW91IG11c3QgYmUgdGhlIGN1cmlvdXMgdHlwZS4gIEJyaW5nIHRoaXMgdXAgYXQgdGhlIGludGVydmlldyBmb3IgYm9udXMgcG9pbnRzICEh';
    const headerDict = {
      'Content-Type' : 'application/json; charset=utf-8',
      'Accept'       : 'application/json',
      'Token'        : token,
      'Candidate'    : 'Abbey Ames'
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    const url = 'https://us-central1-crm-sdk.cloudfunctions.net/flightInfoChallenge';

    const flightInfo: FlightInfoPayload = {
      airline: this.airlineControl.value,
      arrivalDate: this.arrivalDateControl.value,
      arrivalTime: this.arrivalTimeControl.value,
      flightNumber: this.flightNumberControl.value,
      numOfGuests: this.numOfGuestsControl.value,
      comments: this.commentsControl.value
    };

    this.http.post(url, flightInfo, requestOptions).subscribe({
      next: response => {
        console.log('Successfully passed flight to CRM SDK, ', response);
        this.closeDialog(true);
      },
      error: error => this.displayError(error.error)
    });
  }

  displayError(error: any) {
    // Clear loading spinner
    this.splashActive = false;

    // Display error message
    this.dialog.open(ErrorComponent, { width: '500px', data: { message: error } });
  }

  closeDialog(result: boolean) {
    this.dialogRef.close(result);
  }

}

export interface FlightInfoPayload {
  airline: string;
  arrivalDate: Date;
  arrivalTime: string;
  flightNumber: string;
  numOfGuests: number;
  comments?: string;
}