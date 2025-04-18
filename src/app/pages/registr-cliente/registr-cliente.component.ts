import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
    idCliente: 0,
    tipoDocumento: '',
    nombreCompleto: '',
    documento: '',
    telefono: '',
    email: '',
    direccion: '',
    ubigeo: '',
    enListaNegra: false,
    departamento: '',
    provincia: '',
    distrito: ''
  };

  editingClient = false;
  clients: cliente[] = []; 
  
  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: string[] = [];
  displayedColumns: string[] = ['nombreCompleto', 'documento', 'email', 'telefono', 'acciones'];

  constructor(
    private clientService: ClientService,
    private ubigeoService: UbigeoService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadClients();
    this.loadDepartamentos();
  }

  loadClients(): void {
    this.clientService.getAllClients().subscribe({
      next: (data: cliente[]) => {
        this.clients = data;
        console.log("clients: ", data)
      },
      error: () => Swal.fire('Error', 'Error al cargar clientes')
    });
  }
  
  loadDepartamentos(): void {
    this.departamentos = this.ubigeoService.getDepartamentos();
  }

  onDepartamentoChange(): void {
    this.client.provincia = '';
    this.client.distrito = '';
    this.provincias = this.ubigeoService.getProvincias(this.client.departamento);
    this.distritos = [];
  }

  onProvinciaChange(): void {
    this.client.distrito = '';
    this.distritos = this.ubigeoService.getDistritos(this.client.departamento, this.client.provincia);
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
        next: () => {
          Swal.fire('Éxito', 'Cliente registrado correctamente', 'success');
          this.resetForm();
          this.loadClients();
        },
        error: (err) => {
          Swal.fire('Error', err.error?.message || 'Error al registrar cliente', 'error');
        }
      });
    }
  }
 
  editClient(cliente: any): void {
    this.client = { 
      ...cliente,
      tipoDocumento: cliente.tipoDocumento || '',
      nombreCompleto: cliente.nombreCompleto || '',
      documento: cliente.documento || '',
      telefono: cliente.telefono || '',
      email: cliente.email || '',
      direccion: cliente.direccion || '',
      ubigeo: cliente.ubigeo || '',
      departamento: cliente.departamento || '',
      provincia: cliente.provincia || '',
      distrito: cliente.distrito || '',
      enListaNegra: cliente.enListaNegra || false
    };
    this.editingClient = true;
  
    this.provincias = this.ubigeoService.getProvincias(this.client.departamento);
    this.distritos = this.ubigeoService.getDistritos(this.client.departamento, this.client.provincia);
  }
  
  deleteClient(id: number): void {
    Swal.fire({
      title: '¿Está seguro de eliminar este cliente?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.deleteClient(id).subscribe({
          next: () => {
            this.toastr.success('Cliente eliminado');
            this.loadClients();
          },
          error: () => this.toastr.error('Error al eliminar')
        });
      }
    });
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.client = { 
      tipoDocumento: '',
      idCliente: 0, 
      nombreCompleto: '', 
      documento: '', 
      telefono: '', 
      email: '', 
      direccion: '', 
      ubigeo: '', 
      departamento: '', 
      provincia: '',
      distrito: '',
      enListaNegra: false 
    };
    this.editingClient = false;
  }
}
