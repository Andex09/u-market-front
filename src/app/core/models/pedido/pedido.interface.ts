export interface Pedido {
  id: number,
  clienteId: number,
  clienteNombre: string,
  estadoPedidoId: number,
  estadoPedidoDescripcion: string,
  total: number,
  fecha: string,
}

export type CrearPedidoRequest = Omit<Pedido, 'id'
  | "clienteNombre"
  | "estadoPedidoDescripcion">

export type ActualizarPedidoRequest = Omit<Pedido, "clienteNombre"
  | "estadoPedidoDescripcion">

export type PedidoResponse = Pedido
