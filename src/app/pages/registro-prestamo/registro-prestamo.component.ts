import { Component } from '@angular/core';
import { PrestamoRequestDTO } from '../../models/prestamo';
import { PrestamoService } from '../../services/prestamo.service';
import { Console } from 'console';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';  
import { MatButtonModule } from '@angular/material/button';  
import { MatCardModule } from '@angular/material/card';  

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

  mensaje = '';

  constructor(private servicio: PrestamoService) {}

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
