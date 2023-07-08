import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto, ProductoResponse } from 'src/app/core/models/producto/producto.interface';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent implements OnInit {

  producto!: ProductoResponse;
  constructor(
    private readonly dialog: MatDialogRef<DetalleProductoComponent>,
    @Inject(MAT_DIALOG_DATA) readonly data: { producto: ProductoResponse }
  ) {
    this.producto = data.producto;
  }

  ngOnInit(): void {
  }

}
