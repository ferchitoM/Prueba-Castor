import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routes/app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EmpleadosComponent } from './components/empleados/empleados.component';
import { NewComponent } from './components/empleados/new/new.component';
import { ShowComponent } from './components/empleados/show/show.component';
import { UpdateComponent } from './components/empleados/update/update.component';
import { DeleteComponent } from './components/empleados/delete/delete.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,

    EmpleadosComponent,
    NewComponent,
    ShowComponent,
    UpdateComponent,
    DeleteComponent,

    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
