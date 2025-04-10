export interface Usuario {
  IdUsuario: number;
  Usuario: string;
  ContraseniaHash: string;  
  Rol: string;
  Activo: boolean;
}
