import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pais } from '../../models/pais.model';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-pais-dialog',
  templateUrl: './pais-dialog.component.html',
  styleUrls: ['./pais-dialog.component.scss']
})
export class PaisDialogComponent implements OnInit {
  paisForm!: FormGroup;
  tituloDialog: string = 'Afegir país';
  modoEdicion: boolean = false;

  constructor(
    private fb: FormBuilder,
    private paisesService: PaisesService,
    public dialogRef: MatDialogRef<PaisDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pais
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    
    if (this.data && this.data.id) {
      this.tituloDialog = 'Modificar país';
      this.modoEdicion = true;
      this.paisForm.patchValue(this.data);
    }
  }

  inicializarFormulario(): void {
    this.paisForm = this.fb.group({
      id: [null],
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      codigo: ['', [Validators.required, Validators.maxLength(10)]],
      digito: ['', [Validators.maxLength(2)]],
      comunitario: ['', [Validators.maxLength(50)]],
      activo: [true],
      asimiladoAComunitario: [false]
    });
  }

  guardar(): void {
    if (this.paisForm.invalid) {
      return;
    }

    const pais: Pais = this.paisForm.value;
    
    if (this.modoEdicion) {
      this.paisesService.actualizarPais(pais.id!, pais)
        .subscribe(() => {
          this.dialogRef.close(true);
        });
    } else {
      this.paisesService.crearPais(pais)
        .subscribe(() => {
          this.dialogRef.close(true);
        });
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}