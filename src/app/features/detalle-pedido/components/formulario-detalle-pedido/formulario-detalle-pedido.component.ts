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
        valor: new FormControl(null, [Validators.required]),
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
        valor: detallePedido.valor
      });
      this.esActualizar = true;
    }
  }

  agregar(): void {
    if (this.form.invalid) {
      SwalUtils.showAlert('Atención', 'Faltan datos', 'warning');
      return;
    }
    const values = this.form.value;

    let detallePedido: CrearDetallePedidoRequest = {
      pedidoId: values.pedidoId,
      productoId: values.productoId,
      cantidad: values.cantidad,
      valor: values.valor
    }
    this.detallePedidoService.crearDetallePedido(detallePedido).subscribe(
      {
        next: (resp: DetallePedidoResponse) => {
          SwalUtils.showAlert('Información', 'Detalle pedido creado', 'success')
            .then(() => {

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
      valor: values.valor
    }
    this.detallePedidoService.actualizarDetallePedido(detallePedido).subscribe(
      {
        next: (resp: DetallePedidoResponse) => {
          SwalUtils.showAlert('Información', 'Cliente actualizado', 'success')
            .then(() => {
              this.dialogRef.close(resp);
            });

        },
        error: (error: any) => {
          SwalUtils.showAlert('Atención', `Error actualizando el cliente: ${error}`, 'error');
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

}
