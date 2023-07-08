import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActualizarClienteRequest, Cliente, ClienteResponse, CrearClienteRequest, EstadoCliente } from 'src/app/core/models/cliente/cliente.interface';
import { TipoDocumento } from 'src/app/core/models/tipo-documento/tipo-documento.interface';
import { ClienteService } from 'src/app/core/services/cliente/cliente.service';
import { SwalUtils } from 'src/app/shared/utils';
import { TipoDocumentoService } from '../../../../core/services/tipo-documento/tipo-documento.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-formulario-cliente',
  templateUrl: './formulario-cliente.component.html',
  styleUrls: ['./formulario-cliente.component.scss']
})
export class FormularioClienteComponent implements OnInit {

  listEstadoCliente: EstadoCliente[] = [{ id: 'A', descripcion: 'Activo' }, { id: 'I', descripcion: 'Inactivo' }];
  listTipoDocumento: TipoDocumento[] = [];

  form!: FormGroup
  isForm!: Promise<any>
  esActualizar: boolean = false

  constructor(
    private clienteService: ClienteService,
    private tipoDocumentoService: TipoDocumentoService,
    private formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<FormularioClienteComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: { cliente: Cliente }) { }

  ngOnInit(): void {
    this.cargarDatos();
    this.iniciarFormulario();
    this.definirCrearActualizar(this.data?.cliente);
  }

  private cargarDatos(): void {
    this.tipoDocumentoService.obtenerTiposDocumento().subscribe(
      (resp: TipoDocumento[]) => {
        this.listTipoDocumento = resp;
      }
    );
  }

  iniciarFormulario(): void {
    this.isForm = Promise.resolve(
      (this.form = this.formBuilder.group({
        nombres: new FormControl(null, [Validators.required]),
        apellidos: new FormControl(null, [Validators.required]),
        estado: new FormControl(null, [Validators.required]),
        documento: new FormControl(null, [Validators.required]),
        tipoDocumentoId: new FormControl(null, [Validators.required]),
      }))
    );
  }

  definirCrearActualizar(cliente: Cliente): void {
    console.log(cliente);
    if (cliente) {
      this.form.patchValue({
        id: cliente.id,
        nombres: cliente.nombres,
        apellidos: cliente.apellidos,
        tipoDocumentoId: cliente.tipoDocumentoId,
        documento: cliente.documento,
        estado: cliente.estado
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

    let cliente: CrearClienteRequest = {
      nombres: values.nombres,
      apellidos: values.apellidos,
      documento: values.documento,
      tipoDocumentoId: values.tipoDocumentoId,
      estado: values.estado
    }
    this.clienteService.crearCliente(cliente).subscribe(
      {
        next: (resp: ClienteResponse) => {
          SwalUtils.showAlert('Información', 'Cliente creado', 'success')
            .then(() => {
              this.dialogRef.close(resp);
            });

        },
        error: (error: any) => {
          SwalUtils.showAlert('Atención', `Error creando el cliente: ${error}`, 'error');
        }
      }
    );
  }

  actualizarCliente(): void {
    if (this.form.invalid) {
      SwalUtils.showAlert('Atención', 'Faltan datos', 'warning');
      return;
    }
    const values = this.form.value;

    let cliente: ActualizarClienteRequest = {
      id: this.data.cliente.id,
      nombres: values.nombres,
      apellidos: values.apellidos,
      documento: values.documento,
      tipoDocumentoId: values.tipoDocumentoId,
      estado: values.estado
    }
    this.clienteService.actualizarCliente(cliente).subscribe(
      {
        next: (resp: ClienteResponse) => {
          SwalUtils.showAlert('Información', 'Cliente actualizado', 'success')
            .then(() => {
              this.dialogRef.close(resp);
            });

        },
        error: (error: any) => {
          SwalUtils.showAlert('Atención', `Error actualizando el cliente: ${error}`, 'error');
        }
      }
    );
  }

  procesarOperacion(): void {
    if (this.esActualizar) {
      this.actualizarCliente();
    }
    else {
      this.agregar();
    }
  }

}
