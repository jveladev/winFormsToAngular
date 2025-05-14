import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PaisesService } from '../../services/paises.service';
import { Pais } from '../../models/pais.model';
import { PaisEditComponent } from '../pais-edit/pais-edit.component';

@Component({
  selector: 'app-paises-list',
  templateUrl: './paises-list.component.html',
  styleUrls: ['./paises-list.component.scss']
})
export class PaisesListComponent implements OnInit {
  paises: Pais[] = [];
  filtroForm: FormGroup;
  columnas: string[] = ['nombre', 'codigo', 'digito', 'comunitario', 'activo', 'asimiladoAComunitario', 'acciones'];
  cargando = false;
  idEntidad: number = 1; // Valor por defecto, debe ser obtenido por parámetro

  constructor(
    private paisesService: PaisesService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.filtroForm = this.fb.group({
      nombre: [''],
      mostrarNoActivos: [false]
    });
  }

  ngOnInit(): void {
    this.buscarPaises();
  }

  buscarPaises(): void {
    this.cargando = true;
    const { nombre, mostrarNoActivos } = this.filtroForm.value;
    
    this.paisesService.buscarPaises(nombre, mostrarNoActivos)
      .subscribe({
        next: (data) => {
          this.paises = data;
          this.cargando = false;
        },
        error: (error) => {
          console.error('Error al cargar los países', error);
          this.cargando = false;
        }
      });
  }

  limpiarFiltros(): void {
    this.filtroForm.reset({
      nombre: '',
      mostrarNoActivos: false
    });
    this.buscarPaises();
  }

  abrirDialogoCrear(): void {
    const dialogRef = this.dialog.open(PaisEditComponent, {
      width: '500px',
      data: { 
        mode: 'create',
        idEntidad: this.idEntidad
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.buscarPaises();
      }
    });
  }

  abrirDialogoEditar(pais: Pais): void {
    const dialogRef = this.dialog.open(PaisEditComponent, {
      width: '500px',
      data: { 
        mode: 'edit',
        pais: pais
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.buscarPaises();
      }
    });
  }

  confirmarEliminar(pais: Pais): void {
    if (confirm('¿Está seguro de que desea eliminar este país?')) {
      if (pais.id) {
        this.paisesService.eliminarPais(pais.id).subscribe({
          next: () => {
            this.buscarPaises();
          },
          error: (error) => {
            console.error('Error al eliminar el país', error);
          }
        });
      }
    }
  }
} 