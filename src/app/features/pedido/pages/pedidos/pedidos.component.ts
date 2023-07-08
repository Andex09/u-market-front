import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Pedido, PedidoResponse } from 'src/app/core/models/pedido/pedido.interface';
import { PedidoService } from 'src/app/core/services/pedido/pedido.service';
import { FormularioPedidoComponent } from '../../components/formulario-pedido/formulario-pedido.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { PedidoDetalleComponent } from '../../components/detalle-pedido/detalle-pedido.component';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  listColumnas: string[] = ['id', 'clienteNombre', 'estadoPedidoDescripcion', 'total', 'opciones'];
  listPedidos: PedidoResponse[] = [];

  dataSource: MatTableDataSource<PedidoResponse> = new MatTableDataSource<PedidoResponse>([]);

  isForm!: Promise<any>
  pedido!: Pedido

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private pedidoService: PedidoService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  private cargarDatos(): void {
    this.pedidoService.obtenerPedidos().subscribe(
      (resp: PedidoResponse[]) => {
        this.listPedidos = resp;
        this.dataSource = new MatTableDataSource<PedidoResponse>(resp);
        this.cargarPaginador();
      }
    );
  }

  private cargarPaginador(): void {
    this.dataSource.paginator = this.paginator;
  }

  verDetalle(pedido: PedidoResponse): void {
    this.dialog.open(PedidoDetalleComponent, {
      width: '50%',
      data: { pedido }
    });
  }

  crearPedido(): void {
    const dialogRef = this.dialog.open(FormularioPedidoComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listPedidos = [...this.listPedidos, result];
        this.dataSource = new MatTableDataSource(this.listPedidos);
        this.cargarPaginador();
      }
    });
  }

  editarPedido(pedido: Pedido): void {

    const dialogRef = this.dialog.open(FormularioPedidoComponent, {
      width: '50%',
      data: { pedido }
    });

    dialogRef.afterClosed().subscribe((result: PedidoResponse) => {
      if (result) {
        this.listPedidos = this.listPedidos.map((pedido) =>
          pedido.id === result.id ? result : pedido
        );
        this.dataSource = new MatTableDataSource(this.listPedidos);
        this.cargarPaginador();
      }
    });
  }


}
