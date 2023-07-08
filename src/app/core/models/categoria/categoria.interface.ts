export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
}

export type CrearCategoriaRequest = Omit<Categoria, "id">;
