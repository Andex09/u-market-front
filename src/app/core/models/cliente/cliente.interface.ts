export interface Cliente {
  id: number,
  nombres: string,
  apellidos: string,
  documento: string,
  tipoDocumentoId: number,
  tipoDocumentoDescripcion: string
  estado: string
}

export type CrearClienteRequest = Omit<Cliente,
  "id"
  | "tipoDocumentoDescripcion">;

export type ActualizarClienteRequest = Omit<Cliente, "tipoDocumentoDescripcion">;

export type ClienteResponse = Cliente;

export interface EstadoCliente {
  id: string,
  descripcion: string
}
