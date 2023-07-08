export interface DetallePedido {
  id: number,
  pedidoId: number,
  productoId: number,
  productoNombre: string,
  cantidad: number,
  valor: number
}

export type CrearDetallePedidoRequest = Omit<DetallePedido, "id" | "productoNombre">

export type ActualizarDetallePedidoRequest = Omit<DetallePedido, "productoNombre">

export type DetallePedidoResponse = DetallePedido

