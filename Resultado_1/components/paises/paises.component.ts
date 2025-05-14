import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Pais } from '../../models/pais.model';
import { PaisesService } from '../../services/paises.service';
import { PaisDialogComponent } from '../pais-dialog/pais-dialog.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.scss']
})
export class PaisesComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'codigo', 'digito', 'comunitario', 'activo', 'asimiladoAComunitario', 'acciones'];
  dataSource = new MatTableDataSource<Pais>([]);
  
  nombreFilter = new FormControl('');
  mostrarNoActivos = new FormControl(false);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private paisesService: PaisesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // Configurar filtros
    this.nombreFilter.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => this.cargarPaises());
    
    this.mostrarNoActivos.valueChanges
      .subscribe(() => this.cargarPaises());
    
    this.cargarPaises();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cargarPaises(): void {
    const filtro = {
      nombre: this.nombreFilter.value || '',
      mostrarNoActivos: this.mostrarNoActivos.value || false
    };
    
    this.paisesService.getPaises(filtro)
      .subscribe(paises => {
        this.dataSource.data = paises;
      });
  }

  abrirDialog(pais?: Pais): void {
    const dialogRef = this.dialog.open(PaisDialogComponent, {
      width: '500px',
      data: pais || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarPaises();
      }
    });
  }

  modificar(pais: Pais): void {
    this.abrirDialog(pais);
  }

  eliminar(pais: Pais): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        titulo: 'Eliminar país',
        mensaje: `¿Está seguro que desea eliminar el país "${pais.nombre}"?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && pais.id) {
        this.paisesService.eliminarPais(pais.id)
          .subscribe(() => {
            this.cargarPaises();
          });
      }
    });
  }
}