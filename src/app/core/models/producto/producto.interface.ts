export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  referencia: string;
  precioUnitario: number;
  unidadesDisponibles: number;
  categoriaId: number,
  nombreCategoria: string
}

export type ProductoResponse = Omit<Producto, 'categoriaId'>;

export type CrearProductoRequest = Omit<Producto, 'id' | 'nombreCategoria'>;

export type ActualizarProductoRequest = Omit<Producto, 'nombreCategoria'>;
