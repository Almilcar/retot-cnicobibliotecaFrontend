import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/ClientService.service';
import { UbigeoService } from '../../services/ubigeo.service';
import { ToastrService } from 'ngx-toastr';
 
import Swal from 'sweetalert2';
import { cliente } from '../Models/clienteModels';
 
@Component({
  selector: 'app-registr-cliente',
  standalone: false,
  templateUrl: './registr-cliente.component.html',
  styleUrl: './registr-cliente.component.css'
})
export class RegistrClienteComponent implements OnInit {
  client: cliente = {
    IdCliente: 0,
    TipoDocumento: '',
    NombreCompleto: '',
    Documento: '',
    Telefono: '',
    Email: '',
    Direccion: '',
    Ubigeo: '',
    Departamento: '',
    Provincia: '',
    Distrito: '',
    EnListaNegra: false
  };

  editingClient = false;
  clients: cliente[] = []; 
  
  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: string[] = [];
  displayedColumns: string[] = ['nombreCompleto', 'documento', 'email', 'telefono'];


  constructor(
    private clientService: ClientService,
    private ubigeoService: UbigeoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadClients();
    this.loadDepartamentos();
  }

  loadClients(): void {
    this.clientService.getAllClients().subscribe({
      next: (data: cliente[]) => {
        this.clients = data;
      },
      error: () => Swal.fire('Error', 'Error al cargar clientes')
    });
  }
  
  loadDepartamentos(): void {
    this.departamentos = this.ubigeoService.getDepartamentos();
  }

  onDepartamentoChange(): void {
    this.client.Provincia = '';
    this.client.Distrito = '';
    this.provincias = this.ubigeoService.getProvincias(this.client.Departamento);
    this.distritos = [];
  }

  onProvinciaChange(): void {
    this.client.Distrito = '';
    this.distritos = this.ubigeoService.getDistritos(this.client.Departamento, this.client.Provincia);
  }

  onSubmit(): void {
    if (this.editingClient) {
      this.clientService.updateClient(this.client).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Cliente actualizado correctamente', 'success');
          this.resetForm();
          this.loadClients();
        },
        error: () => Swal.fire('Error', 'Error al actualizar cliente', 'error')
      });
    } else {
      this.clientService.createClient(this.client).subscribe({
        next: (response) => {     
           Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Préstamo registrado con éxito.',
                    confirmButtonColor: '#3085d6'
                  });
          this.resetForm();
          this.loadClients();
        },
        error: (err) => {
          Swal.fire('Error', err.error?.message || 'Error al registrar cliente', 'error');
        }
      });
    }
  }
 

  editClient(client: any): void {
    this.client = { ...client };
    this.editingClient = true;
    
    this.provincias = this.ubigeoService.getProvincias(this.client.Departamento);
    this.distritos = this.ubigeoService.getDistritos(this.client.Departamento, this.client.Provincia);
  }

  deleteClient(id: number): void {
    if (confirm('¿Está seguro de eliminar este cliente?')) {
      this.clientService.deleteClient(id).subscribe({
        next: () => {
          this.toastr.success('Cliente eliminado');
          this.loadClients();
        },
        error: () => this.toastr.error('Error al eliminar')
      });
    }
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.client = { 

      TipoDocumento: '',
      IdCliente: 0, 
      NombreCompleto: '', 
      Documento: '', 
      Telefono: '', 
      Email: '', 
      Direccion: '', 
      Ubigeo: '', 
      Departamento: '', 
      Provincia: '',
      Distrito: '',
      EnListaNegra: false 
    };
    this.editingClient = false;
  }
}
