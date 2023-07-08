import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './features/categoria/pages/categorias/categorias.component';
import { ProductosComponent } from './features/producto/pages/component/productos.component';
import { ClientesComponent } from './features/cliente/pages/clientes/clientes.component';
import { PedidosComponent } from './features/pedido/pages/pedidos/pedidos.component';
import { DetallePedidoComponent } from './features/detalle-pedido/pages/detalle-pedido/detalle-pedido.component';

const routes: Routes = [
  {
    path: 'categorias',
    component: CategoriasComponent
  },
  {
    path: 'productos',
    component: ProductosComponent
  },
  {
    path: 'clientes',
    component: ClientesComponent
  },
  {
    path: 'pedidos',
    component: PedidosComponent
  },
  {
    path: 'detallePedido',
    component: DetallePedidoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
