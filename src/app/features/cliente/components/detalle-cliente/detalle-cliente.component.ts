import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cliente, ClienteResponse, EstadoCliente } from 'src/app/core/models/cliente/cliente.interface';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.scss']
})
export class DetalleClienteComponent implements OnInit {

  cliente!: ClienteResponse;
  constructor(
    private readonly dialog: MatDialogRef<DetalleClienteComponent>,
    @Inject(MAT_DIALOG_DATA) readonly data: { cliente: ClienteResponse }
  ) {

    this.cliente = data.cliente;
    console.log(this.cliente);
    switch (data.cliente.estado) {
      case 'A':
        this.cliente.estado = 'Activo'
        break;
      case 'I':
        this.cliente.estado = 'Inactivo'
        break;
    }
  }

  ngOnInit(): void {
  }

}
