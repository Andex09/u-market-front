import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { ActualizarProductoRequest, CrearProductoRequest, ProductoResponse } from '../../models/producto/producto.interface';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {
  constructor(private httpClient: HttpClient) { }

  obtenerProductos(): Observable<ProductoResponse[]> {
    return this.httpClient
      .get<ProductoResponse[]>(`${environment.urlBase}/producto/buscarTodos`)
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

  obtenerProductoPorId(id: number): Observable<ProductoResponse> {
    return this.httpClient
      .get<ProductoResponse>(`${environment.urlBase}/producto/buscarPorId/?id=${id}`)
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

  crearProducto(producto: CrearProductoRequest): Observable<ProductoResponse> {
    return this.httpClient
      .post<ProductoResponse>(`${environment.urlBase}/producto/crear`, producto)
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

  actualizarProducto(producto: ActualizarProductoRequest): Observable<ProductoResponse> {
    return this.httpClient
      .put<ProductoResponse>(`${environment.urlBase}/producto/actualizar`, producto)
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
