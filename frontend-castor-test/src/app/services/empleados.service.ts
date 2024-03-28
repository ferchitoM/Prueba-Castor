import { HttpClient } from '@angular/common/http';
import { CSP_NONCE, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Empleados } from '../interfaces/empleados';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  private myApiUrl: string = environment.endpoint;
  private myRouterUrl: string = 'api/Empleados';

  constructor(private http: HttpClient) {}

  getAllEmpleados(): Observable<Empleados[]> {
    return this.http.get<Empleados[]>(
      `${this.myApiUrl}${this.myRouterUrl}/All/`
    );
  }

  getEmpleado(id: number): Observable<Empleados> {
    return this.http.get<Empleados>(
      `${this.myApiUrl}${this.myRouterUrl}/Show/${id}`
    );
  }

  newEmpleado(formValue: any) {
    return firstValueFrom(
      this.http.post<any>(`${this.myApiUrl}${this.myRouterUrl}`, formValue)
    );
  }

  updateEmpleado(formValue: any) {
    return firstValueFrom(
      this.http.put<any>(`${this.myApiUrl}${this.myRouterUrl}`, formValue)
    );
  }

  deleteEmpleado(id: number) {
    return firstValueFrom(
      this.http.delete<any>(`${this.myApiUrl}${this.myRouterUrl}/${id}`)
    );
  }

  uploadImage(image: File, idEmpleado: any) {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('id', idEmpleado);

    return this.http.post<any>(
      `${this.myApiUrl}${this.myRouterUrl}/ImagenEmpleado/UploadImage`,
      formData
    );
  }
}
