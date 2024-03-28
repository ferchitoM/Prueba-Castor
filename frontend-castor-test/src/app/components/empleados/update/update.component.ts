import { CommonModule } from '@angular/common';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { generateErrorList } from 'src/app/shared/manage-http-errors';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { MatDividerModule } from '@angular/material/divider';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Empleados } from 'src/app/interfaces/empleados';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Cargos } from 'src/app/interfaces/cargos';
import { dataDialog } from 'src/app/interfaces/dataDialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.sass'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressBarModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
  ],
})
export class UpdateComponent {
  public myApiUrl: string = environment.endpoint + '/Uploads/Empleados/';
  public empleado: Empleados;
  public cargos: Cargos[];
  public form!: FormGroup;
  public imageToUpload: File;
  public processingImage: boolean = false;
  public processing: boolean = false;
  public errors!: string[];
  public selected = '1';
  public fileInput: any;
  public imageSelected: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: dataDialog,
    private dialogRef: MatDialogRef<UpdateComponent>,
    private _empleadosService: EmpleadosService,
    private http: HttpClient
  ) {
    this.empleado = data.empleado;
    this.cargos = data.cargos;

    this.form = new FormGroup({
      Id: new FormControl(this.empleado.id),
      Cedula: new FormControl(this.empleado.cedula),
      Nombre: new FormControl(this.empleado.nombre),
      Foto: new FormControl(this.empleado.foto),
      ImageName: new FormControl(this.empleado.foto),
      FechaIngreso: new FormControl(this.empleado.fechaIngreso),
      CargoId: new FormControl(this.empleado.cargoId.toString()),
    });

    this.imageToUpload = this.form.get('Foto')!.value;
  }

  async update() {
    console.log(this.form.get('FechaIngreso')?.value);

    this.processing = true;
    await this._empleadosService
      .updateEmpleado(this.form.value)
      .then(() => {
        this.processing = false;
        this.dialogRef.close('updateEmleadosList');
      })
      .catch((e: HttpErrorResponse) => {
        this.errors = generateErrorList(e);
        this.processing = false;
      });
  }

  async uploadImage(event: Event) {
    const eventTarget: HTMLInputElement | null =
      event.target as HTMLInputElement | null;
    if (eventTarget?.files?.[0]) {
      this.imageSelected = true;
      this.imageToUpload = eventTarget.files[0];

      this.processingImage = true;
      this._empleadosService
        .uploadImage(this.imageToUpload, this.empleado.id)
        .subscribe({
          next: (res) => {
            this.setFileData();
            this.form.get('ImageName')?.setValue(res.imageName);
            this.processingImage = false;
          },
          error: (e: HttpErrorResponse) => {
            this.errors = generateErrorList(e);
            this.processingImage = false;
          },
        });
    }
  }

  setFileData(): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.form.get('Foto')?.setValue(reader.result as string);
    });
    reader.readAsDataURL(this.imageToUpload);
  }
}

function provideNativeDateAdapter(): import('@angular/core').Provider {
  throw new Error('Function not implemented.');
}
