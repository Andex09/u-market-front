import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DetallePedidoResponse } from 'src/app/core/models/detalle-pedido/detalle-pedido.interface';
import { DetallePedidoComponent } from '../../pages/detalle-pedido/detalle-pedido.component';

@Component({
  selector: 'app-detalle-detalle-pedido',
  templateUrl: './detalle-detalle-pedido.component.html',
  styleUrls: ['./detalle-detalle-pedido.component.scss']
})
export class DetalleDetallePedidoComponent implements OnInit {

  detallePedido!: DetallePedidoResponse;
  constructor(
    private readonly dialog: MatDialogRef<DetallePedidoComponent>,
    @Inject(MAT_DIALOG_DATA) readonly data: { detallePedido: DetallePedidoResponse }) {

    this.detallePedido = data.detallePedido;
  }

  ngOnInit(): void {
  }

}
