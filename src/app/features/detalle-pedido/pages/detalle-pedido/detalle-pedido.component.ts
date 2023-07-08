import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActualizarDetallePedidoRequest, DetallePedidoResponse } from 'src/app/core/models/detalle-pedido/detalle-pedido.interface';
import { DetallePedidoService } from 'src/app/core/services/detalle-pedido/detalle-pedido.service';
import { DetalleDetallePedidoComponent } from '../../components/detalle-detalle-pedido/detalle-detalle-pedido.component';
import { MatDialog } from '@angular/material/dialog';
import { FormularioDetallePedidoComponent } from '../../components/formulario-detalle-pedido/formulario-detalle-pedido.component';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.scss']
})
export class DetallePedidoComponent implements OnInit {

  listColumnas: string[] = ['id', 'pedidoId', 'productoNombre', 'cantidad', 'valor', 'opciones'];
  listDetallePedido: DetallePedidoResponse[] = [];

  dataSource: MatTableDataSource<DetallePedidoResponse> = new MatTableDataSource<DetallePedidoResponse>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private detallePedidoService: DetallePedidoService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  private cargarDatos(): void {
    this.detallePedidoService.obtenerDetallesPedido().subscribe(
      (resp: DetallePedidoResponse[]) => {
        this.listDetallePedido = resp;
        this.dataSource = new MatTableDataSource<DetallePedidoResponse>(resp);
        this.cargarPaginador();
      }
    );
  }

  private cargarPaginador(): void {
    this.dataSource.paginator = this.paginator;
  }

  verDetalle(detallePedido: DetallePedidoResponse): void {
    this.dialog.open(DetalleDetallePedidoComponent, {
      width: '50%',
      data: { detallePedido }
    });
  }

  editarDetallePedido(detallePedido: DetallePedidoResponse): void {
    const dialogRef = this.dialog.open(FormularioDetallePedidoComponent, {
      width: '50%',
      data: { detallePedido }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listDetallePedido = this.listDetallePedido.map((detallePedido) =>
          detallePedido.id === result.id ? result : detallePedido
        );
        this.dataSource = new MatTableDataSource(this.listDetallePedido);
        this.cargarPaginador();
      }
    });
  }

  crearDetallePedido(): void {
    const dialogRef = this.dialog.open(FormularioDetallePedidoComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listDetallePedido = [...this.listDetallePedido, result];
        this.dataSource = new MatTableDataSource(this.listDetallePedido);
        this.cargarPaginador();
      }
    });
  }
}
