import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActualizarDetallePedidoRequest, CrearDetallePedidoRequest, DetallePedido, DetallePedidoResponse } from 'src/app/core/models/detalle-pedido/detalle-pedido.interface';
import { PedidoResponse } from 'src/app/core/models/pedido/pedido.interface';
import { ProductoResponse } from 'src/app/core/models/producto/producto.interface';
import { DetallePedidoService } from 'src/app/core/services/detalle-pedido/detalle-pedido.service';
import { PedidoService } from 'src/app/core/services/pedido/pedido.service';
import { ProductoService } from 'src/app/core/services/producto/producto.service';
import { SwalUtils } from 'src/app/shared/utils';

@Component({
  selector: 'app-formulario-detalle-pedido',
  templateUrl: './formulario-detalle-pedido.component.html',
  styleUrls: ['./formulario-detalle-pedido.component.scss']
})
export class FormularioDetallePedidoComponent implements OnInit {

  listProducto: ProductoResponse[] = [];
  listPedido: PedidoResponse[] = [];

  form!: FormGroup
  isForm!: Promise<any>
  esActualizar: boolean = false

  producto!: ProductoResponse
  valor: number = 0;

  constructor(
    private productoService: ProductoService,
    private pedidoService: PedidoService,
    private detallePedidoService: DetallePedidoService,
    private readonly dialogRef: MatDialogRef<FormularioDetallePedidoComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private readonly data: { detallePedido: DetallePedidoResponse }) { }

  ngOnInit(): void {
    this.cargarDatosPedido();
    this.cargarDatosProducto();
    this.iniciarFormulario();
    this.definirCrearActualizar(this.data?.detallePedido);
  }

  private cargarDatosPedido(): void {
    this.pedidoService.obtenerPedidos().subscribe(
      (resp: PedidoResponse[]) => {
        this.listPedido = resp;
      }
    );
  }

  private cargarDatosProducto(): void {
    this.productoService.obtenerProductos().subscribe(
      (resp: ProductoResponse[]) => {
        this.listProducto = resp;
      }
    );
  }

  iniciarFormulario(): void {
    this.isForm = Promise.resolve(
      (this.form = this.formBuilder.group({
        pedidoId: new FormControl(null, [Validators.required]),
        productoId: new FormControl(null, [Validators.required]),
        cantidad: new FormControl(null, [Validators.required]),
      }))
    );
  }

  definirCrearActualizar(detallePedido: DetallePedidoResponse): void {
    if (detallePedido) {
      this.form.patchValue({
        id: detallePedido.id,
        pedidoId: detallePedido.pedidoId,
        productoId: detallePedido.productoId,
        cantidad: detallePedido.cantidad,
      });
      this.valor = detallePedido.valor;
      this.esActualizar = true;
    }
  }

  agregar(): void {
    if (this.form.invalid) {
      SwalUtils.showAlert('Atención', 'Faltan datos', 'warning');
      return;
    }
    const values = this.form.value;

    if (values.cantidad > this.producto.unidadesDisponibles) {
      SwalUtils.showAlert('Atención', `Las unidades disponibles del producto ${this.producto.nombre} son ${this.producto.unidadesDisponibles}, no se puede crear el detalle pedido`, 'error');
      return;
    }

    let detallePedido: CrearDetallePedidoRequest = {
      pedidoId: values.pedidoId,
      productoId: values.productoId,
      cantidad: values.cantidad,
      valor: this.valor
    }
    this.detallePedidoService.crearDetallePedido(detallePedido).subscribe(
      {
        next: (resp: DetallePedidoResponse) => {
          SwalUtils.showAlert('Información', 'Detalle pedido creado', 'success')
            .then(() => {
              this.dialogRef.close(resp);
            });

        },
        error: (error: any) => {
          SwalUtils.showAlert('Atención', `Error creando el detalle pedido: ${error}`, 'error');
        }
      }
    );
  }

  actualizarDetallePedido(): void {
    if (this.form.invalid) {
      SwalUtils.showAlert('Atención', 'Faltan datos', 'warning');
      return;
    }
    const values = this.form.value;

    let detallePedido: ActualizarDetallePedidoRequest = {
      id: this.data.detallePedido.id,
      productoId: values.productoId,
      pedidoId: values.pedidoId,
      cantidad: values.cantidad,
      valor: this.valor
    }
    this.detallePedidoService.actualizarDetallePedido(detallePedido).subscribe(
      {
        next: (resp: DetallePedidoResponse) => {
          SwalUtils.showAlert('Información', 'Detalle pedido actualizado', 'success')
            .then(() => {
              this.dialogRef.close(resp);
            });

        },
        error: (error: any) => {
          SwalUtils.showAlert('Atención', `Error actualizando el detalle pedido: ${error}`, 'error');
        }
      }
    );
  }

  procesarOperacion(): void {
    if (this.esActualizar) {
      this.actualizarDetallePedido();
    }
    else {
      this.agregar();
    }
  }

  changeProducto(e: any): void {
    this.producto = this.listProducto.filter(p => p.id === e.value)[0];
    let cantidad: number = this.form.value.cantidad;
    this.valor = cantidad * this.producto.precioUnitario;
  }

  modelChangeCantidad(e: any): void {
    if (e === null || this.producto === null) {
      this.valor = 0;
    }

    if (this.producto != null) {
      this.valor = e * this.producto.precioUnitario;
    }
  }
}
