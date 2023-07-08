import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { ActualizarClienteRequest, ClienteResponse, CrearClienteRequest } from '../../models/cliente/cliente.interface';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  constructor(private httpClient: HttpClient) { }

  obtenerClientes(): Observable<ClienteResponse[]> {
    return this.httpClient
      .get<ClienteResponse[]>(`${environment.urlBase}/cliente/buscarTodos`)
      .pipe(
        catchError((error) =>
          throwError(() =>
            error.error.descripcion
              ? error.error.descripcion
              : error.error.errorMessage
          )
        )
      );
  }

  obtenerClientePorId(id: number): Observable<ClienteResponse> {
    return this.httpClient
      .get<ClienteResponse>(`${environment.urlBase}/cliente/buscarPorId/?id=${id}`)
      .pipe(
        catchError((error) =>
          throwError(() =>
            error.error.descripcion
              ? error.error.descripcion
              : error.error.errorMessage
          )
        )
      );
  }

  crearCliente(cliente: CrearClienteRequest): Observable<ClienteResponse> {
    return this.httpClient
      .post<ClienteResponse>(`${environment.urlBase}/cliente/crear`, cliente)
      .pipe(
        catchError((error) =>
          throwError(() =>
            error.error.descripcion
              ? error.error.descripcion
              : error.error.errorMessage
          )
        )
      );
  }

  actualizarCliente(cliente: ActualizarClienteRequest): Observable<ClienteResponse> {
    return this.httpClient
      .put<ClienteResponse>(`${environment.urlBase}/cliente/actualizar`, cliente)
      .pipe(
        catchError((error) =>
          throwError(() =>
            error.error.descripcion
              ? error.error.descripcion
              : error.error.errorMessage
          )
        )
      );
  }
}
