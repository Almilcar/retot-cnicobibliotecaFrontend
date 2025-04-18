import { Component } from '@angular/core';
import { PrestamoRequestDTO } from '../../models/prestamo';
import { PrestamoService } from '../../services/prestamo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-prestamo',
  standalone: false,
  templateUrl: './registro-prestamo.component.html',
  styleUrl: './registro-prestamo.component.css'
})
export class RegistroPrestamoComponent {
  prestamo: PrestamoRequestDTO = {
    idCliente: 0,
    medioEntrega: '',
    libros: []
  };
  prestamos: PrestamoRequestDTO[] = [];
  mensaje = '';
  displayedColumns: string[] = ['idCliente', 'medioEntrega', 'idCopia', 'fechaEntrega'];
  constructor(private servicio: PrestamoService) {}

  ngOnInit(): void {
    this.listarPrestamosLibro();
  }
  
  formatDate(date: string): string {
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0];   
  }
  
  listarPrestamosLibro(){
    this.servicio.obtenerPrestamos().subscribe({
      next: (data) => {
        data.forEach((prestamo) => {
          prestamo.libros.forEach((libro) => {
            libro.fechaEntrega = this.formatDate(libro.fechaEntrega);
          });
        });
        this.prestamos = data;
      },
      error: (err) => {
        console.error('Error al obtener el préstamo:', err);
      }
    });
  }
  

  agregarLibro() {
    this.prestamo.libros.push({ idCopia: 0, fechaEntrega: '' });
  }

  registrar() {
    const prestamoParaEnviar = {
      ...this.prestamo,
      libros: this.prestamo.libros.map(libro => ({
        ...libro,
        fechaEntrega: new Date(libro.fechaEntrega).toISOString() 
      }))
    };
  
    this.servicio.registrarPrestamo(prestamoParaEnviar).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Préstamo registrado con éxito.',
          confirmButtonColor: '#3085d6'
        });
      },
      error: err => {
        const mensaje = err.error?.mensaje || err.error || 'Ocurrió un error inesperado.';
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: mensaje,
          confirmButtonColor: '#d33'
        });
      }
    });
  }
}
