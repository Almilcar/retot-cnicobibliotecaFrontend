import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrestamoRequestDTO } from '../models/prestamo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private baseUrl = 'http://localhost:5246/api/libros';


  constructor(private http: HttpClient) {}

  registrarPrestamo(data: PrestamoRequestDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/registrar`, data);
  }

  obtenerPrestamos(): Observable<PrestamoRequestDTO[]> {
    return this.http.get<PrestamoRequestDTO[]>(`${this.baseUrl}/listar`);
  }
}
