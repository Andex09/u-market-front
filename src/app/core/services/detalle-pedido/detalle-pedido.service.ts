import { Injectable } from '@angular/core';
import { ActualizarDetallePedidoRequest, CrearDetallePedidoRequest, DetallePedidoResponse } from '../../models/detalle-pedido/detalle-pedido.interface';
import { environment } from 'src/app/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {

  constructor(private httpClient: HttpClient) { }

  obtenerDetallesPedido(): Observable<DetallePedidoResponse[]> {
    return this.httpClient
      .get<DetallePedidoResponse[]>(`${environment.urlBase}/detallePedido/buscarTodos`)
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

  obtenerDetallesPedidoPorId(id: number): Observable<DetallePedidoResponse> {
    return this.httpClient
      .get<DetallePedidoResponse>(`${environment.urlBase}/detallePedido/buscarPorId/?id=${id}`)
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

  crearDetallePedido(detallePedido: CrearDetallePedidoRequest): Observable<DetallePedidoResponse> {
    return this.httpClient
      .post<DetallePedidoResponse>(`${environment.urlBase}/detallePedido/crear`, detallePedido)
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

  actualizarDetallePedido(detallePedido: ActualizarDetallePedidoRequest): Observable<DetallePedidoResponse> {
    return this.httpClient
      .put<DetallePedidoResponse>(`${environment.urlBase}/detallePedido/actualizar`, detallePedido)
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
