import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ErrorComponent } from '../error/error.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { Flight } from '../models/flight';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { SplashComponent } from '../splash/splash.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-flight-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    HttpClientModule,
    SplashComponent,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './flight-list.component.html',
  styleUrl: './flight-list.component.scss'
})
export class FlightListComponent implements OnInit, OnChanges {

  splashActive = false;

  @Input() reload: boolean = false;

  fullFlightList: [] = [];
  dataSource: Flight[] = [];

  displayedColumns: string[] = [
    'airline',
    'flightNumber',
    'arrivalDate',
    'arrivalTime',
    'numOfGuests',
    'comments'
  ];

  constructor(public afAuth: Auth, public http: HttpClient, public dialog: MatDialog ) { }

  ngOnInit() {
    this.splashActive = true;
    this.getSavedFlights();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reload']) {
      this.splashActive = true;
      this.getSavedFlights();
    }
  }
  
  getSavedFlights() {
    this.http.get<any>('https://mrg-flight-tracker-app-default-rtdb.firebaseio.com/flights.json')
    .subscribe({
      next: (data) => {
        this.fullFlightList = data;

        // Convert into array
        this.dataSource = [];
        for (let key in this.fullFlightList) {
          this.dataSource.push(this.fullFlightList[key]);
        }

        // Filter by current user
        this.filterByCurrentUser();
      },
      error: (error) => this.displayError(error)
    });
  }

  filterByCurrentUser() {
    this.dataSource = this.dataSource.filter(flight => flight.user === this.afAuth.currentUser?.email);

    // Clear loading spinner
    this.splashActive = false;
  }

  displayDate(fullDate: string) {
    return fullDate.split('T')[0];
  }

  displayError(error: any) {
    // Clear loading spinner
    this.splashActive = false;

    console.log(error);

    // Display error
    this.dialog.open(ErrorComponent, { width: '500px', data: { message: error } });
  }

}
