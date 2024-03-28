import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Empleados } from 'src/app/interfaces/empleados';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressBarModule,
  ],
})
export class DeleteComponent {
  public processing: boolean = false;

  constructor(
    private _empleadosService: EmpleadosService,
    @Inject(MAT_DIALOG_DATA) public empleado: Empleados,
    private dialogRef: MatDialogRef<DeleteComponent>
  ) {}

  async delete() {
    this.processing = true;
    await this._empleadosService
      .deleteEmpleado(this.empleado.id!)
      .then(() => {
        this.dialogRef.close('updateEmleadosList');
      })
      .catch((e: HttpErrorResponse) => {
        this.processing = false;
      });
  }
}
