import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './shared/angular-material.module';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CategoriasComponent } from './features/categoria/pages/categorias/categorias.component';
import { PedidosComponent } from './features/pedido/pages/pedidos/pedidos.component';
import { ProductosComponent } from './features/producto/pages/component/productos.component';
import { ClientesComponent } from './features/cliente/pages/clientes/clientes.component';
import { FormularioCategoriaComponent } from './features/categoria/components/formulario-categoria/formulario-categoria.component';
import { DetalleCategoriaComponent } from './features/categoria/components/detalle-categoria/detalle-categoria.component';
import { DetalleProductoComponent } from './features/producto/components/detalle-producto/detalle-producto.component';
import { FormularioClienteComponent } from './features/cliente/components/formulario-cliente/formulario-cliente.component';
import { DetalleClienteComponent } from './features/cliente/components/detalle-cliente/detalle-cliente.component';
import { CategoriaService } from './core/services/categoria/categoria.service';
import { ClienteService } from './core/services/cliente/cliente.service';
import { TipoDocumentoService } from './core/services/tipo-documento/tipo-documento.service';
import { FormularioProductoComponent } from './features/producto/components/formulario-producto/formulario-producto.component';
import { ProductoService } from './core/services/producto/producto.service';
import { FormularioDetallePedidoComponent } from './features/detalle-pedido/components/formulario-detalle-pedido/formulario-detalle-pedido.component';
import { DetallePedidoComponent } from './features/detalle-pedido/pages/detalle-pedido/detalle-pedido.component';
import { DetallePedidoService } from './core/services/detalle-pedido/detalle-pedido.service';
import { DetalleDetallePedidoComponent } from './features/detalle-pedido/components/detalle-detalle-pedido/detalle-detalle-pedido.component';
import { FormularioPedidoComponent } from './features/pedido/components/formulario-pedido/formulario-pedido.component';
import { PedidoDetalleComponent } from './features/pedido/components/detalle-pedido/detalle-pedido.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    CategoriasComponent,
    ProductosComponent,
    PedidosComponent,
    ClientesComponent,
    FormularioCategoriaComponent,
    DetalleCategoriaComponent,
    DetalleProductoComponent,
    FormularioProductoComponent,
    FormularioClienteComponent,
    DetalleClienteComponent,
    FormularioDetallePedidoComponent,
    DetallePedidoComponent,
    DetalleDetallePedidoComponent,
    FormularioDetallePedidoComponent,
    FormularioPedidoComponent,
    PedidoDetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    CategoriaService,
    ProductoService,
    ClienteService,
    DetallePedidoService,
    TipoDocumentoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(translateService: TranslateService) {
    translateService.setDefaultLang('es');
    translateService.use('es');
  }
}
