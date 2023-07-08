import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CrearCategoriaRequest } from 'src/app/core/models/categoria/categoria.interface';
import { Categoria } from 'src/app/core/models/categoria/categoria.interface';
import { CategoriaService } from 'src/app/core/services/categoria/categoria.service';
import { SwalUtils } from 'src/app/shared/utils';

@Component({
  selector: 'app-formulario-categoria',
  templateUrl: './formulario-categoria.component.html',
  styleUrls: ['./formulario-categoria.component.scss'],
})
export class FormularioCategoriaComponent implements OnInit {

  form!: FormGroup;
  isForm!: Promise<any>;
  esActualizar: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private readonly dialogRef: MatDialogRef<FormularioCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: { categoria: Categoria }
  ) { }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.definirCrearActualizar(this.data?.categoria);
  }

  iniciarFormulario(): void {
    this.isForm = Promise.resolve(
      (this.form = this.formBuilder.group({
        nombre: new FormControl(null, [Validators.required]),
        descripcion: new FormControl(null, []),
      }))
    );
  }

  definirCrearActualizar(categoria: Categoria): void {
    if (categoria) {
      this.form.patchValue({
        id: categoria.id,
        nombre: categoria.nombre,
        descripcion: categoria.descripcion,
      });
      this.esActualizar = true;
    }
  }

  agregar(): void {
    if (this.form.invalid) {
      SwalUtils.showAlert('Atención', 'Faltan datos', 'warning');
      return;
    }
    const values = this.form.value;

    let categoria: CrearCategoriaRequest = {
      nombre: values.nombre,
      descripcion: values.descripcion,
    };
    this.categoriaService.crearCategoria(categoria).subscribe({
      next: (resp: Categoria) => {
        SwalUtils.showAlert('Información', 'Categoría creada', 'success').then(
          () => {
            this.dialogRef.close(resp);
          }
        );
      },

      error: (error: any) => {
        SwalUtils.showAlert(
          'Atención',
          `Error creando la categoría: ${error}`,
          'error'
        );
      },
    });
  }


  actualizarCategoria(): void {
    if (this.form.invalid) {
      SwalUtils.showAlert('Atención', 'Faltan datos', 'warning');
      return;
    }
    const values = this.form.value;

    let categoria: Categoria = {
      id: this.data.categoria.id,
      nombre: values.nombre,
      descripcion: values.descripcion,
    };
    this.categoriaService.actualizarCategoria(categoria).subscribe({
      next: (resp: Categoria) => {
        SwalUtils.showAlert(
          'Información',
          'Categoría actualizada',
          'success'
        ).then(() => {
          this.dialogRef.close(resp);
        });
      },
      error: (error: any) => {
        SwalUtils.showAlert(
          'Atención',
          `Error actualizando la categoría: ${error}`,
          'error'
        );
      },
    });
  }

  procesarOperacion(): void {
    if (this.esActualizar) {
      this.actualizarCategoria();
    } else {
      this.agregar();
    }
  }
}
