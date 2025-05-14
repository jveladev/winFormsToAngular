import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaisesService } from '../../services/paises.service';
import { Pais } from '../../models/pais.model';

interface DialogData {
  mode: 'create' | 'edit';
  pais?: Pais;
  idEntidad?: number;
}

@Component({
  selector: 'app-pais-edit',
  templateUrl: './pais-edit.component.html',
  styleUrls: ['./pais-edit.component.scss']
})
export class PaisEditComponent implements OnInit {
  paisForm: FormGroup;
  titulo: string;
  esModoEdicion: boolean;
  guardando = false;

  constructor(
    private fb: FormBuilder,
    private paisesService: PaisesService,
    public dialogRef: MatDialogRef<PaisEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.esModoEdicion = data.mode === 'edit';
    this.titulo = this.esModoEdicion ? 'Editar País' : 'Nuevo País';

    this.paisForm = this.fb.group({
      nombre: ['', [Validators.required]],
      codigo: ['', [Validators.required]],
      digito: [''],
      comunitario: [''],
      activo: [true],
      asimiladoAComunitario: [false]
    });

    if (this.esModoEdicion && data.pais) {
      this.paisForm.patchValue(data.pais);
    }
  }

  ngOnInit(): void {
  }

  guardar(): void {
    if (this.paisForm.invalid) {
      this.paisForm.markAllAsTouched();
      return;
    }

    this.guardando = true;
    const paisData: Pais = this.paisForm.value;

    if (this.esModoEdicion && this.data.pais?.id) {
      this.paisesService.actualizarPais(this.data.pais.id, paisData)
        .subscribe({
          next: (result) => {
            this.dialogRef.close(result);
            this.guardando = false;
          },
          error: (error) => {
            console.error('Error al actualizar el país', error);
            this.guardando = false;
          }
        });
    } else {
      // En modo creación, añadimos el idEntidad
      if (this.data.idEntidad) {
        paisData.idEntidad = this.data.idEntidad;
      }
      
      this.paisesService.crearPais(paisData)
        .subscribe({
          next: (result) => {
            this.dialogRef.close(result);
            this.guardando = false;
          },
          error: (error) => {
            console.error('Error al crear el país', error);
            this.guardando = false;
          }
        });
    }
  }

  cerrar(): void {
    this.dialogRef.close();
  }
} 