import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../Models/usuario.model';
import Swal from 'sweetalert2';

 
@Component({
  selector: 'app-registo-usuario',
  standalone: false,
  templateUrl: './registo-usuario.component.html',
  styleUrl: './registo-usuario.component.css'
})
export class RegistoUsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuario: Usuario = { idUsuario: 0, usuario: '', contraseniaHash: '', rol: '', activo: true };
  isEditing = false;
  displayedColumns: string[] = ['usuario', 'rol', 'activo', 'acciones'];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.usuarios = data;
        } else {
          Swal.fire('Error', 'Respuesta inesperada del servidor', 'error');
        }
      },
      error: (err) => {
        Swal.fire('Error', 'Error al cargar clientes', 'error');
      }
    });
  }
  
  onSubmit() {
    if (this.isEditing) {
      this.usuarioService.updateUsuario(this.usuario).subscribe(() => {
        this.loadUsuarios();
        this.resetForm();
      });
    } else {
      this.usuarioService.createUsuario(this.usuario).subscribe(() => {
        this.loadUsuarios();
        this.resetForm();
      });
    }
  }

  editUsuario(usuario: Usuario) {
    console.log('Editando usuario:', usuario); 
    this.usuario = JSON.parse(JSON.stringify(usuario));
    this.isEditing = true;
    console.log('¿isEditing?', this.isEditing);
  }

  deleteUsuario(id: number) {
    this.usuarioService.deleteUsuario(id).subscribe(() => {
      this.loadUsuarios();
    });
  }

  resetForm() {
    this.usuario = { idUsuario: 0, usuario: '', contraseniaHash: '', rol: '', activo: true };
    this.isEditing = false;
  }
}