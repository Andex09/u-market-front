import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { TipoDocumento } from '../../models/tipo-documento/tipo-documento.interface';

@Injectable({
  providedIn: 'root'
})

export class TipoDocumentoService {
  constructor(private httpClient: HttpClient) { }

  obtenerTiposDocumento(): Observable<TipoDocumento[]> {
    return this.httpClient
      .get<TipoDocumento[]>(`${environment.urlBase}/tipoDocumento/buscarTodos`)
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

  obtenerTipoDocumentoPorId(id: number): Observable<TipoDocumento> {
    return this.httpClient
      .get<TipoDocumento>(`${environment.urlBase}/tipoDocumento/buscarPorId/?id=${id}`)
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
