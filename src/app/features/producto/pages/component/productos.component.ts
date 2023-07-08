import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ProductoResponse } from 'src/app/core/models/producto/producto.interface';
import { ProductoService } from 'src/app/core/services/producto/producto.service';
import { FormularioProductoComponent } from '../../components/formulario-producto/formulario-producto.component';
import { SwalUtils } from 'src/app/shared/utils';
import { DetalleProductoComponent } from '../../components/detalle-producto/detalle-producto.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  listColumnas: string[] = ['id', 'nombre', 'descripcion', 'referencia', 'opciones'];
  listProductos: ProductoResponse[] = [];


  dataSource: MatTableDataSource<ProductoResponse> = new MatTableDataSource<ProductoResponse>([]);

  producto!: ProductoResponse

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productoService: ProductoService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarPaginador() {
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items';
    }
  }

  cargarDatos() {
    this.productoService.obtenerProductos().subscribe(
      {
        next: (resp: ProductoResponse[]) => {
          this.listProductos = resp;
          this.dataSource = new MatTableDataSource<ProductoResponse>(resp);
          this.cargarPaginador();
        },
        error: (error) => {
          SwalUtils.showAlert(
            'Atención',
            `Error cargando datos: ${error}`,
            'error'
          );
        }
      }
    );
  }

  verDetalle(producto: ProductoResponse): void {
    this.dialog.open(DetalleProductoComponent, {
      width: '50%',
      data: { producto }
    });
  }

  editarProducto(producto: ProductoResponse): void {
    const dialogRef = this.dialog.open(FormularioProductoComponent, {
      width: '50%',
      data: { producto }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listProductos = this.listProductos.map((cliente) =>
          cliente.id === result.id ? result : cliente
        );
        this.dataSource = new MatTableDataSource(this.listProductos);
        this.cargarPaginador();
      }
    });
  }

  crearProductoDialog(): void {
    const dialogRef = this.dialog.open(FormularioProductoComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listProductos = [...this.listProductos, result];
        this.dataSource = new MatTableDataSource(this.listProductos);
        this.cargarPaginador();
      }
    });
  }
}
