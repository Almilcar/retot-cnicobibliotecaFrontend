import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../Models/usuario.model';

 
@Component({
  selector: 'app-registo-usuario',
  standalone: false,
  templateUrl: './registo-usuario.component.html',
  styleUrl: './registo-usuario.component.css'
})
export class RegistoUsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuario: Usuario = { IdUsuario: 0, Usuario: '', ContraseniaHash: '', Rol: '', Activo: true };
  isEditing = false;
  displayedColumns: string[] = ['usuario', 'rol', 'activo', 'acciones'];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.usuarioService.getUsuarios().subscribe(data => {
      if (Array.isArray(data)) {
        this.usuarios = data;
        console.log("Usuarios: ", this.usuarios);
      } else {
        console.error('Los datos no son un array:', data);
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
    this.usuario = { ...usuario };
    this.isEditing = true;
  }

  deleteUsuario(id: number) {
    this.usuarioService.deleteUsuario(id).subscribe(() => {
      this.loadUsuarios();
    });
  }

  resetForm() {
    this.usuario = { IdUsuario: 0, Usuario: '', ContraseniaHash: '', Rol: '', Activo: true };
    this.isEditing = false;
  }
}