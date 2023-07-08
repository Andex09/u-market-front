import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Categoria } from '../../models/categoria/categoria.interface';
import { HttpClient } from '@angular/common/http';
import { CrearCategoriaRequest } from '../../models/categoria/categoria.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private httpClient: HttpClient) { }

  obtenerCategorias(): Observable<Categoria[]> {
    return this.httpClient
      .get<Categoria[]>(`${environment.urlBase}/categoria/buscarTodos`)
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

  obtenerCategoriaPorId(id: number): Observable<Categoria> {
    return this.httpClient
      .get<Categoria>(`${environment.urlBase}/categoria/buscarPorId/?id=${id}`)
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

  crearCategoria(categoria: CrearCategoriaRequest): Observable<Categoria> {
    return this.httpClient
      .post<Categoria>(`${environment.urlBase}/categoria/crear`, categoria)
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

  actualizarCategoria(categoria: Categoria): Observable<Categoria> {
    return this.httpClient
      .put<Categoria>(`${environment.urlBase}/categoria/actualizar`, categoria)
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
