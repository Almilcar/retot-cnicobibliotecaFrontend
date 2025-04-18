export interface Usuario {
  idUsuario: number;
  usuario: string;
  contraseniaHash: string;  
  rol: string;
  activo: boolean;
}
