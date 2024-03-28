import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { generateErrorList } from 'src/app/shared/manage-http-errors';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { MatDividerModule } from '@angular/material/divider';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Cargos } from 'src/app/interfaces/cargos';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.sass'],
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
export class NewComponent {
  public myApiUrl: string = environment.endpoint + '/Uploads/Empleados/';
  public cargos: Cargos[];
  public form!: FormGroup;
  public imageToUpload: File;
  public processingImage: boolean = false;
  public processing: boolean = false;
  public errors!: string[];
  public selected = '1';
  public fileInput: any;
  public imageSelected: boolean = false;
  public idEmpleado: Number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Cargos[],
    private dialogRef: MatDialogRef<NewComponent>,
    private _empleadosService: EmpleadosService
  ) {
    this.cargos = data;

    this.form = new FormGroup({
      Id: new FormControl(),
      Cedula: new FormControl(),
      Nombre: new FormControl(),
      Foto: new FormControl(),
      ImageName: new FormControl(),
      FechaIngreso: new FormControl(new Date()),
      CargoId: new FormControl('1'),
    });

    this.imageToUpload = this.form.get('Foto')!.value;
  }

  async newEmpleado() {
    this.processing = true;
    if (this.imageToUpload)
      this.form.get('ImageName')!.setValue(this.imageToUpload.name);
    else this.form.get('ImageName')!.setValue('');

    await this._empleadosService
      .newEmpleado(this.form.value)
      .then((idEmpleado) => {
        this.idEmpleado = idEmpleado;
        this.uploadImage();
      })
      .catch((e: HttpErrorResponse) => {
        this.errors = generateErrorList(e);
        this.processing = false;
      });
  }

  async uploadImage() {
    this._empleadosService
      .uploadImage(this.imageToUpload, this.idEmpleado)
      .subscribe({
        next: (res) => {
          this.form.get('ImageName')?.setValue(res.imageName);
          this.processingImage = false;
          this.dialogRef.close('updateEmleadosList');
        },
        error: (e: HttpErrorResponse) => {
          this.errors = generateErrorList(e);
          this.processingImage = false;
        },
      });
  }

  setFileData(event: Event): void {
    const eventTarget: HTMLInputElement | null =
      event.target as HTMLInputElement | null;
    if (eventTarget?.files?.[0]) {
      this.imageSelected = true;
      this.imageToUpload = eventTarget.files[0];

      this.processingImage = true;
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.form.get('Foto')?.setValue(reader.result as string);
        this.processingImage = false;
      });
      reader.readAsDataURL(this.imageToUpload);
    }
  }
}

function provideNativeDateAdapter(): import('@angular/core').Provider {
  throw new Error('Function not implemented.');
}
