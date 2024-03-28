import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from '../components/empleados/empleados.component';
import { ShowComponent } from '../components/empleados/show/show.component';
import { UpdateComponent } from '../components/empleados/update/update.component';
import { NewComponent } from '../components/empleados/new/new.component';

const routes: Routes = [
  { path: '', redirectTo: 'empleados', pathMatch: 'full' },
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'empleados/show/:id', component: ShowComponent },
  { path: 'empleados/create', component: NewComponent },
  { path: 'empleados/update', component: UpdateComponent },
  { path: '**', redirectTo: 'empleados', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
