import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PedidoService } from '../../../../core/services/pedido/pedido.service';
import { ProductoService } from 'src/app/core/services/producto/producto.service';
import { ClienteService } from 'src/app/core/services/cliente/cliente.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActualizarPedidoRequest, CrearPedidoRequest, PedidoResponse } from 'src/app/core/models/pedido/pedido.interface';
import { SwalUtils } from 'src/app/shared/utils';
import { ActualizarClienteRequest, ClienteResponse } from 'src/app/core/models/cliente/cliente.interface';
import { EstadoPedidoService } from '../../../../core/services/estado-pedido/estado-pedido.service';
import { EstadoPedido } from 'src/app/core/models/estado-pedido/estado-pedido.interface';

@Component({
  selector: 'app-formulario-pedido',
  templateUrl: './formulario-pedido.component.html',
  styleUrls: ['./formulario-pedido.component.scss']
})
export class FormularioPedidoComponent implements OnInit {

  listClientes: ClienteResponse[] = [];
  listEstadoPedido: EstadoPedido[] = [];

  form!: FormGroup;
  isForm!: Promise<any>;
  esActualizar: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private pedidoService: PedidoService,
    private estadoPedidoService: EstadoPedidoService,
    private clienteService: ClienteService,
    private readonly dialogRef: MatDialogRef<FormularioPedidoComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: { pedido: ActualizarPedidoRequest }) { }

  ngOnInit(): void {
    this.cargarDatosCliente();
    this.cargarDatosEstadoPedido();
    this.iniciarFormulario();
    this.definirCrearActualizar(this.data?.pedido);
  }

  private cargarDatosCliente(): void {
    this.clienteService.obtenerClientes().subscribe(
      (resp: ClienteResponse[]) => {
        this.listClientes = resp;
      }
    );
  }

  private cargarDatosEstadoPedido(): void {
    this.estadoPedidoService.obtenerEstadosPedido().subscribe(
      (resp: EstadoPedido[]) => {
        this.listEstadoPedido = resp;
      }
    );
  }

  iniciarFormulario(): void {
    this.isForm = Promise.resolve(
      (this.form = this.formBuilder.group({
        clienteId: new FormControl(null, [Validators.required]),
        estadoPedidoId: new FormControl(null, [Validators.required]),
        total: new FormControl(null, [Validators.required]),
        fecha: new FormControl(null, [Validators.required]),
      }))
    );
  }

  definirCrearActualizar(pedido: ActualizarPedidoRequest): void {
    if (pedido) {
      console.log(pedido);
      this.form.patchValue({
        id: pedido.id,
        clienteId: pedido.clienteId,
        estadoPedidoId: pedido.estadoPedidoId,
        total: pedido.total,
        fecha: pedido.fecha.split('/').reverse().join('-')
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

    let pedido: CrearPedidoRequest = {
      clienteId: values.clienteId,
      estadoPedidoId: values.estadoPedidoId,
      total: values.total,
      fecha: values.fecha
    };
    this.pedidoService.crearPedido(pedido).subscribe({
      next: (resp: PedidoResponse) => {
        SwalUtils.showAlert('Información', 'Pedido creado', 'success').then(
          () => {
            this.dialogRef.close(resp);
          }
        );
      },

      error: (error: any) => {
        SwalUtils.showAlert(
          'Atención',
          `Error creando el pedido: ${error}`,
          'error'
        );
      },
    });
  }


  actualizarCategoria(): void {
    if (this.form.invalid) {
      SwalUtils.showAlert('Atención', 'Faltan datos', 'warning');
      return;
    }
    const values = this.form.value;

    let pedido: ActualizarPedidoRequest = {
      id: this.data.pedido.id,
      clienteId: values.clienteId,
      estadoPedidoId: values.estadoPedidoId,
      total: values.total,
      fecha: values.fecha
    };
    this.pedidoService.actualizarPedido(pedido).subscribe({
      next: (resp: PedidoResponse) => {
        SwalUtils.showAlert(
          'Información',
          'Pedido actualizado',
          'success'
        ).then(() => {
          this.dialogRef.close(resp);
        });
      },
      error: (error: any) => {
        SwalUtils.showAlert(
          'Atención',
          `Error actualizando el pedido: ${error}`,
          'error'
        );
      },
    });
  }

  procesarOperacion(): void {
    if (this.esActualizar) {
      this.actualizarCategoria();
    } else {
      this.agregar();
    }
  }

}
