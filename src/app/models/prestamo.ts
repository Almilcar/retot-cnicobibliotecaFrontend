export interface DetallePrestamoDTO {
    idCopia: number;
    fechaEntrega: string;
  }
  
  export interface PrestamoRequestDTO {
    idCliente: number;
    medioEntrega: string;
    libros: DetallePrestamoDTO[];
  }
  