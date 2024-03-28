import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cargos } from '../interfaces/cargos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CargosService {
  private myAppUrl: string = environment.endpoint;
  private myRouterUrl: string = 'api/Cargos';

  constructor(private http: HttpClient) {}

  getAllCargos(): Observable<Cargos[]> {
    return this.http.get<Cargos[]>(`${this.myAppUrl}${this.myRouterUrl}/All/`);
  }
}
