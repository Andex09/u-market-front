import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActualizarClienteRequest, ClienteResponse } from 'src/app/core/models/cliente/cliente.interface';
import { ClienteService } from 'src/app/core/services/cliente/cliente.service';
import { DetalleCategoriaComponent } from 'src/app/features/categoria/components/detalle-categoria/detalle-categoria.component';
import { FormularioClienteComponent } from '../../components/formulario-cliente/formulario-cliente.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DetalleClienteComponent } from '../../components/detalle-cliente/detalle-cliente.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  listColumnas: string[] = ['id', 'nombres', 'apellidos', 'documento', 'tipoDocumentoDescripcion', 'opciones'];
  listCliente: ClienteResponse[] = [];

  dataSource: MatTableDataSource<ClienteResponse> = new MatTableDataSource<ClienteResponse>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private clienteService: ClienteService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  private cargarDatos(): void {
    this.clienteService.obtenerClientes().subscribe(
      (resp: ClienteResponse[]) => {
        this.listCliente = resp;
        this.dataSource = new MatTableDataSource<ClienteResponse>(resp);
        this.cargarPaginador();
        console.log(resp);
      }
    );
  }

  private cargarPaginador(): void {
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items';
    }
  }

  verDetalle(cliente: ClienteResponse): void {
    this.dialog.open(DetalleClienteComponent, {
      width: '50%',
      data: { cliente }
    });
  }

  editarCliente(cliente: ActualizarClienteRequest): void {
    const dialogRef = this.dialog.open(FormularioClienteComponent, {
      width: '50%',
      data: { cliente }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listCliente = this.listCliente.map((cliente) =>
          cliente.id === result.id ? result : cliente
        );
        this.dataSource = new MatTableDataSource(this.listCliente);
        this.cargarPaginador();
      }
    });
  }

  crearCliente(): void {
    const dialogRef = this.dialog.open(FormularioClienteComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listCliente = [...this.listCliente, result];
        this.dataSource = new MatTableDataSource(this.listCliente);
        this.cargarPaginador();
      }
    });
  }

}
