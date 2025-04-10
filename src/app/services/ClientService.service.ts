import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cliente } from '../pages/Models/clienteModels';


@Injectable({
  providedIn: 'root'
})

export class ClientService {
  private apiUrl = 'http://localhost:5246/api/cliente';  

  constructor(private http: HttpClient) {}

  getAllClients(): Observable<cliente[]> {
    return this.http.get<cliente[]>(this.apiUrl);
  }

  createClient(cliente: cliente): Observable<void> {
    return this.http.post<void>(this.apiUrl, cliente);
  }

  updateClient(cliente: cliente): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${cliente.IdCliente}`, cliente);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
