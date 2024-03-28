import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Empleados } from 'src/app/interfaces/empleados';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.sass'],
  standalone: true,
  imports: [
    MatCardModule,
    RouterModule,
    MatTabsModule,
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class ShowComponent {
  public myApiUrl: string = environment.endpoint + '/Uploads/Empleados/';

  constructor(@Inject(MAT_DIALOG_DATA) public empleado: Empleados) {}
}
