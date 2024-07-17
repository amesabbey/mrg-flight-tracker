import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-error',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {

  constructor(public dialogRef: MatDialogRef<ErrorComponent>, @Inject(MAT_DIALOG_DATA) public data: { message: string }) {

  }

}
