import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Categoria } from 'src/app/core/models/categoria/categoria.interface';

@Component({
  selector: 'app-detalle-categoria',
  templateUrl: './detalle-categoria.component.html',
  styleUrls: ['./detalle-categoria.component.scss']
})
export class DetalleCategoriaComponent implements OnInit {

  categoria!: Categoria;
  constructor(
    private readonly dialog: MatDialogRef<DetalleCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) readonly data: { categoria: Categoria }
  ) {
    this.categoria = data.categoria;
  }

  ngOnInit(): void {
  }

}
