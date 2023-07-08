import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { ActualizarPedidoRequest, CrearPedidoRequest, PedidoResponse } from '../../models/pedido/pedido.interface';

@Injectable({
  providedIn: 'root'
})

export class PedidoService {
  constructor(private httpClient: HttpClient) { }

  obtenerPedidos(): Observable<PedidoResponse[]> {
    return this.httpClient
      .get<PedidoResponse[]>(`${environment.urlBase}/pedido/buscarTodos`)
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

  obtenerPedidoPorId(id: number): Observable<PedidoResponse> {
    return this.httpClient
      .get<PedidoResponse>(`${environment.urlBase}/Pedido/buscarPorId/?id=${id}`)
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

  crearPedido(pedido: CrearPedidoRequest): Observable<PedidoResponse> {
    return this.httpClient
      .post<PedidoResponse>(`${environment.urlBase}/pedido/crear`, pedido)
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

  actualizarPedido(pedido: ActualizarPedidoRequest): Observable<PedidoResponse> {
    return this.httpClient
      .put<PedidoResponse>(`${environment.urlBase}/pedido/actualizar`, pedido)
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
