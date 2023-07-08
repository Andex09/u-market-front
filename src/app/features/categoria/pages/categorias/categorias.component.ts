import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormularioCategoriaComponent } from '../../components/formulario-categoria/formulario-categoria.component';
import { MatPaginator } from '@angular/material/paginator';
import { DetalleCategoriaComponent } from '../../components/detalle-categoria/detalle-categoria.component';
import { Categoria } from 'src/app/core/models/categoria/categoria.interface';
import { CategoriaService } from 'src/app/core/services/categoria/categoria.service';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  listColumnas: string[] = [
    'id',
    'nombre',
    'descripcion',
    'opciones'
  ];

  listCategorias: Categoria[] = [];

  dataSource: MatTableDataSource<Categoria> = new MatTableDataSource<Categoria>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private categoriaService: CategoriaService,
    private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  private cargarDatos(): void {
    this.categoriaService.obtenerCategorias().subscribe(
      (resp: Categoria[]) => {
        this.listCategorias = resp;
        this.dataSource = new MatTableDataSource<Categoria>(resp);
        this.cargarPaginador();
      }
    );
  }

  private cargarPaginador(): void {
    this.dataSource.paginator = this.paginator;
  }

  verDetalle(categoria: Categoria): void {
    this.dialog.open(DetalleCategoriaComponent, {
      width: '50%',
      data: { categoria }
    });
  }

  crearCategoria(): void {
    const dialogRef = this.dialog.open(FormularioCategoriaComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listCategorias = [...this.listCategorias, result];
        this.dataSource = new MatTableDataSource(this.listCategorias);
        this.cargarPaginador();
      }
    });
  }

  editarCategoria(categoria: Categoria): void {
    const dialogRef = this.dialog.open(FormularioCategoriaComponent, {
      width: '50%',
      data: { categoria }
    });

    dialogRef.afterClosed().subscribe((result: Categoria) => {
      if (result) {
        this.listCategorias = this.listCategorias.map((categoria) =>
          categoria.id === result.id ? result : categoria
        );
        this.dataSource = new MatTableDataSource(this.listCategorias);
        this.cargarPaginador();
      }
    });
  }

}
