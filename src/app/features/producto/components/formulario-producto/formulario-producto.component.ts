import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SwalUtils } from 'src/app/shared/utils';
import { CategoriaService } from 'src/app/core/services/categoria/categoria.service';
import { Categoria } from 'src/app/core/models/categoria/categoria.interface';
import { ProductoService } from 'src/app/core/services/producto/producto.service';
import { ActualizarProductoRequest, CrearProductoRequest, Producto, ProductoResponse } from 'src/app/core/models/producto/producto.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './formulario-producto.component.html',
  styleUrls: ['./formulario-producto.component.scss']
})
export class FormularioProductoComponent implements OnInit {
  listCategorias: Categoria[] = [];
  form!: FormGroup
  isForm!: Promise<any>
  producto!: ProductoResponse

  esActualizar: boolean = false
  mybreakpoint: number = 1

  constructor(private productoService: ProductoService,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private readonly dialogRef: MatDialogRef<FormularioProductoComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: { producto: ActualizarProductoRequest }) { }

  ngOnInit(): void {
    this.mybreakpoint = (window.innerWidth <= 900) ? 1 : 2;
    this.cargarDatos();
    this.iniciarFormulario();
    this.definirCrearActualizar(this.data?.producto);
  }

  handleSize(event: any) {
    this.mybreakpoint = (event.target.innerWidth <= 900) ? 1 : 2;
  }

  iniciarFormulario(): void {
    this.isForm = Promise.resolve(
      (this.form = this.formBuilder.group({
        nombre: new FormControl(null, [Validators.required]),
        descripcion: new FormControl(null, []),
        referencia: new FormControl(null, [Validators.required]),
        precioUnitario: new FormControl(null, [Validators.required]),
        unidadesDisponibles: new FormControl(null, [Validators.required]),
        categoriaId: new FormControl(null, [Validators.required]),
      }))
    );
  }

  cargarDatos(): void {
    this.categoriaService.obtenerCategorias().subscribe(
      (resp: Categoria[]) => {
        this.listCategorias = resp;
      }
    );
  }

  definirCrearActualizar(producto: ActualizarProductoRequest): void {
    if (producto) {
      this.form.patchValue({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        categoriaId: producto.categoriaId,
        referencia: producto.referencia,
        precioUnitario: producto.precioUnitario,
        unidadesDisponibles: producto.unidadesDisponibles
      });
      this.esActualizar = true;
    }
  }

  actualizarProducto() {
    if (this.form.invalid) {
      SwalUtils.showAlert('Atención', 'Faltan datos', 'warning');
      return;
    }
    const values = this.form.value;

    let producto: ActualizarProductoRequest = {
      id: this.data.producto.id,
      nombre: values.nombre,
      descripcion: values.descripcion,
      referencia: values.referencia,
      precioUnitario: values.precioUnitario,
      unidadesDisponibles: values.unidadesDisponibles,
      categoriaId: values.categoriaId
    }

    this.productoService.actualizarProducto(producto).subscribe(
      {
        next: (resp: ProductoResponse) => {
          SwalUtils.showAlert('Información', 'Producto actualizado', 'success')
            .then(() => {
              this.dialogRef.close(resp);
            });

        },
        error: (error: any) => {
          SwalUtils.showAlert('Atención', `Error actualizando el producto: ${error}`, 'error');
        }
      }
    );
  }

  agregar(): void {
    if (this.form.invalid) {
      SwalUtils.showAlert('Atención', 'Faltan datos', 'warning');
      return;
    }
    const values = this.form.value;

    let producto: CrearProductoRequest = {
      nombre: values.nombre,
      descripcion: values.descripcion,
      referencia: values.referencia,
      precioUnitario: values.precioUnitario,
      unidadesDisponibles: values.unidadesDisponibles,
      categoriaId: values.categoriaId
    }

    this.productoService.crearProducto(producto).subscribe(
      {
        next: (resp: ProductoResponse) => {
          SwalUtils.showAlert('Información', 'Producto creado', 'success')
            .then(() => {
              this.dialogRef.close(resp);
            });

        },
        error: (error: any) => {
          SwalUtils.showAlert('Atención', `Error creando el producto: ${error}`, 'error');
        }
      }
    );
  }

  procesarOperacion(): void {
    if (this.esActualizar) {
      this.actualizarProducto();
    }
    else {
      this.agregar();
    }
  }
}
