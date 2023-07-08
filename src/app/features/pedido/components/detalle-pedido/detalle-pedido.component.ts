import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PedidoResponse } from 'src/app/core/models/pedido/pedido.interface';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.scss']
})
export class PedidoDetalleComponent implements OnInit {

  pedido!: PedidoResponse;

  constructor(
    private readonly dialog: MatDialogRef<PedidoDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) readonly data: { pedido: PedidoResponse }) {
    this.pedido = data.pedido;
  }

  ngOnInit(): void {
  }

}
