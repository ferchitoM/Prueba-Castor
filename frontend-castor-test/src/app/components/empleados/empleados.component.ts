import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { CargosService } from 'src/app/services/cargos.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Empleados } from 'src/app/interfaces/empleados';
import { Cargos } from 'src/app/interfaces/cargos';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { DeleteComponent } from './delete/delete.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ShowComponent } from './show/show.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpdateComponent } from './update/update.component';
import { NewComponent } from './new/new.component';
import { dataDialog } from 'src/app/interfaces/dataDialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.sass'],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    CommonModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
})
export class EmpleadosComponent implements OnInit, AfterViewInit {
  public myApiUrl: string = environment.endpoint + '/Uploads/Empleados/';
  processing: boolean = true;
  displayedColumns: string[] = [
    'foto',
    'cedula',
    'nombre',
    'fecha ingreso',
    'cargo',
    'options',
  ];
  dataSource = new MatTableDataSource<Empleados>();
  durationInSeconds = 5;
  cargos: Cargos[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _empleadosService: EmpleadosService,
    private _cargosService: CargosService,
    public router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getCargos();
    this.getEmpleados();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getCargos() {
    this._cargosService.getAllCargos().subscribe({
      next: (data) => {
        this.cargos = data;
      },
      error: () => this.router.navigate(['empleados']),
    });
  }

  getEmpleados() {
    this._empleadosService.getAllEmpleados().subscribe({
      next: (data) => {
        this.dataSource.data = data.map((x) => {
          x.cargoNombre = this.cargos.filter(
            (i) => i.id === x.cargoId
          )[0].nombre;
          x.fechaIngreso = this.formatDate(x.fechaIngreso);
          return x;
        });
        this.processing = false;
      },
      error: () => this.router.navigate(['empleados']),
    });
  }

  formatDate(myDate: string) {
    let date = new Date(myDate);
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - offset * 60 * 1000);
    return date.toISOString().split('T')[0];
  }

  openDeleteDialog(
    empleado: Empleados,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: empleado,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getEmpleados();
        this._snackBar.open('Empleado eliminado exitosamente!', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  openShowDialog(
    empleado: Empleados,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(ShowComponent, {
      width: '25rem',
      enterAnimationDuration,
      exitAnimationDuration,
      data: empleado,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openUpdateDialog(
    empleado: Empleados,
    cargos: Cargos[],
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dataParent: dataDialog = { empleado, cargos };

    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '28rem',
      enterAnimationDuration,
      exitAnimationDuration,
      data: dataParent,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'updateEmleadosList') {
        this.getEmpleados();
        this._snackBar.open('Empleado actualizado exitosamente!', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  openNewDialog(
    cargos: Cargos[],
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(NewComponent, {
      width: '28rem',
      enterAnimationDuration,
      exitAnimationDuration,
      data: cargos,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'updateEmleadosList') {
        this.getEmpleados();
        this._snackBar.open('Empleado creado exitosamente!', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }
}
