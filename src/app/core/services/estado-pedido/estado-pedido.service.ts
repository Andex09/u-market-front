import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { EstadoPedido } from '../../models/estado-pedido/estado-pedido.interface';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadoPedidoService {

  constructor(private httpClient: HttpClient) { }

  obtenerEstadosPedido(): Observable<EstadoPedido[]> {
    return this.httpClient
      .get<EstadoPedido[]>(`${environment.urlBase}/estadoPedido/buscarTodos`)
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

  obtenerEstadoPedidoPorId(id: number): Observable<EstadoPedido> {
    return this.httpClient
      .get<EstadoPedido>(`${environment.urlBase}/estadoPedido/buscarPorId/?id=${id}`)
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
